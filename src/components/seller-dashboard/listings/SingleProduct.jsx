import React, { useRef, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { PiInfoThin } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideAlerter from "../../../utils/useOutsideAlerter";


export default function SingleProduct({ item, setOpenInfo }) {
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowOptions, showOptions);


  return (
    <div className="grid gap-5 grid-cols-5 border-t-[0.5px] border-t-gray-500 py-2 px-2">
     
      <img src={item.src} alt={item.title} className="w-[150px] h-[150px]" />
      <div>
        <p className="font-semibold text-blue-400">Title</p>
        <p>{item.title}</p>
        <p className="text-lg text-blue-400">${item.price}</p>
      </div>
      <div>
        <p className="font-semibold text-blue-400">Category</p>
        {item.category[0]}
      </div>
      <div>
        <p className="font-semibold text-blue-400">Available in Stock:</p>
        <p>100</p>
      </div>

      <div className="justify-self-end relative">
        <span
          onClick={() => setShowOptions((prev) => !prev)}
          className="cursor-pointer"
        >
          <PiDotsThreeOutlineThin className="text-3xl text-white hover:text-blue-400" />
        </span>

        <AnimatePresence>
          {showOptions && (
            <motion.div
              ref={wrapperRef}
              key="options"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, y: -5 }}
              className="grid gap-2 border rounded p-2 shadow-md shadow-white absolute right-0"
            >
              <span className="cursor-pointer">
                <CiEdit className="text-xl hover:text-purple-400 text-gray-500" />
              </span>
              <span 
              onClick={()=>setOpenInfo(prev => !prev)}
              className="cursor-pointer">
                <PiInfoThin className="text-xl hover:text-purple-400 text-gray-500" />
              </span>
              <span className="cursor-pointer">
                <CiTrash className="text-xl hover:text-red-500 text-gray-500" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
