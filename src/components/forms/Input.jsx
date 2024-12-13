const Input = ({ label, type, placeholder, value, onChange, name }) => {
    return (
      <div className="mb-4">
        <label className="block text-white font-medium mb-2">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full text-gray-600 px-4 py-2   focus:outline-none focus:ring focus:border-customBrown ring-purple-500 "
        />
      </div>
    );
  };
  
  export default Input;
  