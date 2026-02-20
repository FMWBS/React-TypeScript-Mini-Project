import { useState } from "react";
import type { Artwork } from "../schemas/artworkSchema";
import { NoteSchema } from "../schemas/artworkSchema";

interface ArtworkCardProps {
  artwork: Artwork;
  // Nur in den Suchergebnissen sichtbar
  onAddToGallery?: (artwork: Artwork) => void;
  // Nur in der Galerie sichtbar
  onRemoveFromGallery?: (id: number) => void;
  onUpdateNote?: (id: number, note: string) => void;
  note?: string;
}

function ArtworkCard({
  artwork,
  onAddToGallery,
  onRemoveFromGallery,
  onUpdateNote,
  note,
}: ArtworkCardProps) {
  const [noteInput, setNoteInput] = useState(note ?? "");
  const [noteError, setNoteError] = useState("");

  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`
    : null;

  const handleSaveNote = () => {
    // Notiz mit Zod-Schema pruefen
    const result = NoteSchema.safeParse(noteInput);
    if (!result.success) {
      setNoteError("Notiz muss zwischen 1 und 500 Zeichen lang sein.");
      return;
    }
    setNoteError("");
    if (onUpdateNote) {
      onUpdateNote(artwork.id, noteInput);
    }
  };

  return (
    <div className="artwork-card">
      {imageUrl ? (
        <img src={imageUrl} alt={artwork.title} />
      ) : (
        <div className="no-image">Kein Bild</div>
      )}
      <h3>{artwork.title}</h3>
      <p>{artwork.artist_title ?? "Unbekannter Kuenstler"}</p>

      {onAddToGallery && (
        <button onClick={() => onAddToGallery(artwork)}>
          Zur Galerie hinzufuegen
        </button>
      )}

      {onRemoveFromGallery && (
        <button onClick={() => onRemoveFromGallery(artwork.id)}>
          Entfernen
        </button>
      )}

      {onUpdateNote && (
        <div className="note-section">
          <input
            type="text"
            value={noteInput}
            onChange={(event) => setNoteInput(event.target.value)}
            placeholder="Notiz hinzufuegen..."
          />
          <button onClick={handleSaveNote}>Speichern</button>
          {noteError && <p className="error">{noteError}</p>}
        </div>
      )}
    </div>
  );
}

export default ArtworkCard;
