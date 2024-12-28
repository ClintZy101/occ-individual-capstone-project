import React, { useState, useEffect } from "react";

import { HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import InputSlider from "../input-range/InputRange";
import { FiMinus } from "react-icons/fi";
import { TfiPlus } from "react-icons/tfi";
import usePriceRangeStore from "../../store/usePriceRange";


export default function ProductsGallerySidebar({ chosenCategory, setChosenCategory }) {
  // cat type is object with properties: cat, link
  const [showCategory, setShowCategory] = useState(false);
  const [sliderIsShown, setSliderIsShown] = useState(false);
  const [browseByIsShown, setBrowseByIsShown] = useState(false);

  const {
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    setProductsByPriceRange,
  } = usePriceRangeStore();

  // Update productsByPriceRange whenever min or max value changes
  useEffect(() => {
    setProductsByPriceRange();
  }, [minValue, maxValue, setProductsByPriceRange]);

  const handleCategory = (cat) => {
    setChosenCategory(cat);
  };

  const BrowseBy = ({ handleCategory, category }) => (
    <p
      onClick={() => handleCategory(category)}
      className= {`${chosenCategory === category ? 'text-gray-500 underline' :"hover:text-gray-400 cursor-pointer"}`}
    >
      {category.cat}
    </p>
  );
  return (
    <div className="w-[270px] max-h bg-black text-white px-5 mb-10 ">
      <div className="flex space-x-2 items-center">
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <HiChevronRight className="text-[20px]" />
        <p>{chosenCategory?.cat || "All Products"}</p>
      </div>
      <div
        onClick={() => setBrowseByIsShown(!browseByIsShown)}
        className="flex items-center justify-between mt-10  pb-2 h-8 border-b-gray-500 border-b cursor-pointer"
      >
        <p onClick={() => setShowCategory(!showCategory)} className="">
          Browse By
        </p>
        <p className="text-md text-gray-100">
          {browseByIsShown ? <FiMinus /> : <TfiPlus />}
        </p>
      </div>
      {/* categories */}
      <div
        className={`transition-all duration-500 ${
          browseByIsShown
            ? "opacity-100 max-h-screen grid gap-2 py-4 border-b-gray-500 border-b"
            : "opacity-0 max-h-0 overflow-hidden"
        } `}
      >
        {categories.map((cat, i) => (
          <BrowseBy key={i} category={cat} handleCategory={handleCategory} />
        ))}
      </div>

      {/* <p className="mb-2 font-bold">Filter By</p> */}
      <div className="border-b-gray-500 border-b py-2 mt-4  grid gap-5 place-items-center">
        <div
          onClick={() => setSliderIsShown(!sliderIsShown)}
          className="flex justify-between items-center w-full cursor-pointer"
        >
          <p className=""> Filter By Price</p>

          <p className="text-md text-gray-100">
            {sliderIsShown ? <FiMinus /> : <TfiPlus />}
          </p>
        </div>
        <div
          className={`transition-all duration-500 ${
            sliderIsShown
              ? "opacity-100 max-h-screen grid gap-2"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <InputSlider
            minValue={minValue}
            maxValue={maxValue}
            setMaxValue={setMaxValue}
            setMinValue={setMinValue}
          />
        </div>
     
      </div>
    </div>
  );
}
