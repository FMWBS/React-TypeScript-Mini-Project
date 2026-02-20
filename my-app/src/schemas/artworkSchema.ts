import { z } from "zod";

// Zod-Schema fuer ein einzelnes Kunstwerk
export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string().default("Unbekannter Titel"),
  artist_title: z.string().nullable().default("Unbekannter Kuenstler"),
  image_id: z.string().nullable().default(null),
});

export type Artwork = z.infer<typeof ArtworkSchema>;

// Zod-Schema fuer eine Notiz zu einem Kunstwerk
export const NoteSchema = z.string().min(1).max(500);

// Typ fuer ein gespeichertes Kunstwerk mit Notiz
export type GalleryItem = Artwork & { note: string };
