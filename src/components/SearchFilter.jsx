import React from "react";


export default function SearchFilter({ searchTerm, setSearchTerm }) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex items-center  border w-5/6 md:w-full mx-auto my-5">

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
