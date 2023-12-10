import React, { useState } from 'react';

const SearchBox = () => {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState(''); 

    const handleSearch = () => {
    const apiKey = 'AIzaSyC6CjvAkMnak2ZkbOYyXjtAh4_xIsOCmRA';
    const url = `https://places.googleapis.com/v1/places:searchText`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };

  return (
    <>
    <div>
        <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>検索</button>
    </div>
      
    <div>
        <ul>
        {results.map((place) => (
          <li key={place.id}>{place.name}</li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default SearchBox 