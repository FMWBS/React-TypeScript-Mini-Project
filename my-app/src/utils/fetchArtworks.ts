import { ArtworkSchema, type Artwork } from "../schemas/artworkSchema";

// Kunstwerke von der Art Institute of Chicago API abrufen und validieren
export const fetchArtworks = async (query: string): Promise<Artwork[]> => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,artist_title,image_id`
  );

  if (!response.ok) {
    throw new Error("API-Anfrage fehlgeschlagen");
  }

  const json = await response.json();
  const results: Artwork[] = [];

  for (const item of json.data) {
    const parsed = ArtworkSchema.safeParse(item);
    if (parsed.success) {
      results.push(parsed.data);
    }
  }

  return results;
};
