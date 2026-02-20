import type { GalleryItem } from "../schemas/artworkSchema";
import ArtworkCard from "./ArtworkCard";

interface GalleryProps {
  items: GalleryItem[];
  onRemove: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
}

function Gallery({ items, onRemove, onUpdateNote }: GalleryProps) {
  if (items.length === 0) {
    return <p>Keine Kunstwerke in der Galerie.</p>;
  }

  return (
    <div className="gallery">
      {items.map((item) => (
        <ArtworkCard
          key={item.id}
          artwork={item}
          onRemoveFromGallery={onRemove}
          onUpdateNote={onUpdateNote}
          note={item.note}
        />
      ))}
    </div>
  );
}

export default Gallery;
