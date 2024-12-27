import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchFilter({ searchTerm, setSearchTerm }) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex items-center  border">

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        className=" p-2 w-full text-black outline-purple-500"
      />
    </div>
  );
}
