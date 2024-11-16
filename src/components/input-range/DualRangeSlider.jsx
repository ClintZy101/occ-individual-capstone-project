import React, { useState } from 'react';

const DualRangeSlider = ({ min, max, step, initialMin, initialMax }) => {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  // Handlers to update min and max values
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
  };

  return (
    <div className="w-full p-4">
      {/* Sliders */}
      <div className="relative w-full h-4">
        {/* Track */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full transform -translate-y-1/2" />

        {/* Highlighted Range */}
        <div
          className="absolute top-1/2 h-1 bg-blue-500 rounded-full transform -translate-y-1/2"
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
          }}
        />

        {/* Minimum Value Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-1 appearance-none pointer-events-auto bg-transparent"
          style={{
            zIndex: minValue > max - 10 ? '5' : '3',
          }}
        />

        {/* Maximum Value Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-1 appearance-none pointer-events-auto bg-transparent"
          style={{
            zIndex: maxValue < min + 10 ? '5' : '3',
          }}
        />
      </div>

      {/* Display Selected Range */}
      <div className="flex justify-between mt-4 text-gray-700">
        <span>Min: {minValue}</span>
        <span>Max: {maxValue}</span>
      </div>
    </div>
  );
};

export default DualRangeSlider;
