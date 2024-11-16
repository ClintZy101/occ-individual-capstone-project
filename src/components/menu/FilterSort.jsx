import React,{useState} from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useSortingStore } from "../store/useSortingStore";

export default function FilterSort() {
  const [filterSortOpen, setFilterSortOpen] = useState(false);
  return (
    <div>
         <div className="md:hidden">
        <h2
          onClick={() => setFilterSortOpen(!filterSortOpen)}
          className="underline text-white text-xl cursor-pointer w-max place-self-end"
        >
          Filter & Sort
        </h2>
      </div>
      <AnimatePresence>
        {filterSortOpen ? (
          <motion.div
            initial={{ right: "-100%" }}
            animate={{ right: 0 }}
            exit={{ right: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-full h-full bg-gray-800 text-white p-4 shadow-lg z-50"
          >
            <button
              onClick={() => setFilterSortOpen(false)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Close
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortOption || ""}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Sort by</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
              <option value="newest">Newest</option>
            </select>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
