"use client";
import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useToast from "@/hooks/useToast";
import { useState } from "react";

const client = generateClient<Schema>();

function useFetch() {
  const [loading, setLoading] = useState(true);

  const fetchPositions = async () => {
    const response = await client.models.PlayerPosition.list();
    setLoading(false);
    return { loading, response };
  };

  return {
    fetchPositions,
  };
}

export default useFetch;
