import React, { useState } from "react";

const InputSlider = ({ minValue, maxValue, setMinValue, setMaxValue }) => {
   
  return (
    <div className="grid gap-5">
      {/* min value*/}
      <div className="flex items-center space-x-4">
        <span>{minValue}</span>
        <input
          type="range"
          min={0}
          max={2500}
          step={100}
          value={minValue}
          onChange={(e) => setMinValue(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          style={{
            accentColor: "white", // Tailwind's blue-500 color
          }}
        />
      </div>
      {/* max value */}
      <div className="flex items-center space-x-4">
        <span>{maxValue}</span>
        <input
          type="range"
          min={0}
          max={2500}
          step={100}
          value={maxValue}
          onChange={(e)=>setMaxValue(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          style={{
            accentColor: "white", // Tailwind's blue-500 color
          }}
        />
      </div>
    </div>
  );
};

export default InputSlider;
