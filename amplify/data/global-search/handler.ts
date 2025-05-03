import type { Schema } from "../resource";

type Handler = Schema["globalSearch"]["functionHandler"];

export const handler: Handler = async (event: any) => {
  try {
    const { keyword } = event.arguments;
    const keywordLower = keyword.toLowerCase();

    const [teams, competitions, players, articles, highlights] =
      await Promise.all([
        event.data.Team.list({
          filter: {
            or: [
              { longName: { contains: keywordLower } },
              { shortName: { contains: keywordLower } },
            ],
          },
        }),
        event.data.Competition.list({
          filter: { longName: { contains: keywordLower } },
        }),
        event.data.Player.list({
          filter: {
            or: [
              { firstname: { contains: keywordLower } },
              { lastname: { contains: keywordLower } },
            ],
          },
        }),
        event.data.Article.list({
          filter: { title: { contains: keywordLower } },
        }),
        event.data.Highlight.list({
          filter: { title: { contains: keywordLower } },
        }),
      ]);

    return {
      teams: teams.items,
      competitions: competitions.items,
      players: players.items,
      articles: articles.items,
      highlights: highlights.items,
    };
  } catch (error) {
    console.error("Error searching...:", error);
    throw new Error("Failed to search");
  }
};
