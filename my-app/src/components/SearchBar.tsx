import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim() !== "") {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Kunstwerk suchen..."
      />
      <button type="submit">Suchen</button>
    </form>
  );
}

export default SearchBar;
