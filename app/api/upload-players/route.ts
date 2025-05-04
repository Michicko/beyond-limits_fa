import * as XLSX from "xlsx";
import formidable, { errors as formidableErrors } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { createPlayer } from "@/app/_actions/player-actions"; // Adjust import as necessary
import { objectToFormData } from "@/lib/helpers";

// Disable body parsing for file uploads in Next.js API routes
export const config = {
  api: {
    bodyParser: false,
  },
};

interface PlayerData {
  firstname: string;
  lastname: string;
  dob: string;
  position: string;
  dominantFoot: string;
  squadNo: string;
  height: string;
  weight: string;
}

// Define the API route to handle file upload and player creation
const uploadPlayers = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable({});
  let fields;
  let files;

  try {
    [fields, files] = await form.parse(req);

    // Handle the file upload
    const file = files?.file?.[0];
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Read the uploaded XLSX file
    const workbook = XLSX.readFile(file.filepath);

    // Assume the first sheet in the workbook contains player data
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON format
    const data: PlayerData[] = XLSX.utils.sheet_to_json(worksheet);

    // Iterate through each player and create them
    try {
      const createdPlayers = [];
      for (let player of data) {
        // Validate player data
        if (
          player.firstname &&
          player.lastname &&
          player.dob &&
          player.position &&
          player.dominantFoot &&
          player.squadNo &&
          player.height &&
          player.weight
        ) {
          const newPlayer = {
            firstname: player.firstname,
            lastname: player.lastname,
            dob: player.dob,
            position: player.position,
            dominantFoot: player.dominantFoot,
            squadNo: player.squadNo,
            height: player.height,
            weight: player.weight,
          };

          const formData = objectToFormData(newPlayer);

          // Create the player using the createPlayer action
          const createdPlayer = await createPlayer(formData); // Assuming createPlayer is an async function
          createdPlayers.push(createdPlayer);
        } else {
          console.error("Invalid player data:", player);
        }
      }

      // Respond with a success message and created players data
      res.status(200).json({
        message: "Players created successfully!",
        players: createdPlayers,
      });
    } catch (error) {
      console.error("Error creating players:", error);
      res.status(500).json({ error: "Error creating players." });
    }
  } catch (err: any) {
    // Handle specific errors (e.g., maxFieldsExceeded)
    if (err.code === formidableErrors.maxFieldsExceeded) {
      return res.status(400).json({ error: "Too many fields in the form." });
    }

    console.error("Error parsing the form:", err);
    res.status(500).json({ error: "Error parsing the file upload." });
  }
};

export default uploadPlayers;
