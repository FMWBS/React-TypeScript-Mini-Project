import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ArtworkCard from "./components/ArtworkCard";
import Gallery from "./components/Gallery";
import { fetchArtworks } from "./utils/fetchArtworks";
import { ArtworkSchema, type Artwork, type GalleryItem } from "./schemas/artworkSchema";

function App() {
  const [searchResults, setSearchResults] = useState<Artwork[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const stored = localStorage.getItem("gallery");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const validItems: GalleryItem[] = [];
        for (const item of parsed) {
          const result = ArtworkSchema.safeParse(item);
          if (result.success) {
            validItems.push({ ...result.data, note: item.note ?? "" });
          }
        }
        return validItems;
      } catch {
        return [];
      }
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Galerie bei Aenderung in localStorage speichern
  useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(gallery));
  }, [gallery]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const results = await fetchArtworks(query);
      setSearchResults(results);
    } catch {
      setError("Fehler beim Laden der Suchergebnisse.");
    }
    setLoading(false);
  };

  const addToGallery = (artwork: Artwork) => {
    // Pruefen ob das Kunstwerk schon in der Galerie ist
    const alreadyExists = gallery.some((item) => item.id === artwork.id);
    if (alreadyExists) {
      return;
    }
    setGallery([...gallery, { ...artwork, note: "" }]);
  };

  const removeFromGallery = (id: number) => {
    setGallery(gallery.filter((item) => item.id !== id));
  };

  const updateNote = (id: number, note: string) => {
    setGallery(
      gallery.map((item) =>
        item.id === id ? { ...item, note } : item
      )
    );
  };

  return (
    <div className="app">
      <h1>Art Institute Explorer</h1>

      <section>
        <h2>Suche</h2>
        <SearchBar onSearch={handleSearch} />
        {loading && <p>Laden...</p>}
        {error && <p className="error">{error}</p>}
        <div className="results">
          {searchResults.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onAddToGallery={addToGallery}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>Meine Galerie</h2>
        <Gallery
          items={gallery}
          onRemove={removeFromGallery}
          onUpdateNote={updateNote}
        />
      </section>
    </div>
  );
}

export default App;
