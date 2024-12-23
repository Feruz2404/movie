import React, { useState } from "react";

const Genre = ({ data, selectedGenres, setSelectedGenres, setPage }) => {
  const handleChange = (id) => {
    setPage(1);
    if (selectedGenres.includes(id)) {
      setSelectedGenres(
        selectedGenres.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };


  return (
    <div className="container flex gap-3 overflow-auto p-2">
      {data?.map((item) => (
        <div
          className={`p-1 rounded-md cursor-pointer select-none transition ${
            selectedGenres.includes(item.id)
              ? "bg-red-500 text-black font-bold"
              : "bg-black text-white"
          }`}
          key={item.id}
          onClick={() => handleChange(item.id)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};


export default Genre;
