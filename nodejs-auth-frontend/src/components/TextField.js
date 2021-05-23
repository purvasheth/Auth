import React from "react";
import PropTypes from "prop-types";

export const TextFeild = ({ label, type, id, value, error, callback }) => (
  <div>
    <div className="mx-2 w-5/6 md:w-4/5 lg:w-3/4 xl:w-1/2 flex flex-col">
      <label className="w-max" htmlFor={id}>
        {label}
      </label>
      {error && <div className="text-xs text-red-600 self-end ">{error}</div>}
    </div>
    <input
      className={`shadow-md mx-2 mt-1 mb-4 p-2 text-sm w-5/6 text-gray-600 focus:outline-none focus:border-2 focus:border-pink-600 md:w-4/5 lg:w-3/4 xl:w-1/2 ${
        error && "border-2 border-red-600"
      }`}
      type={type}
      id={id}
      value={value}
      onChange={(e) => {
        callback(e.target.value);
      }}
    ></input>
  </div>
);

TextFeild.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  callback: PropTypes.func.isRequired,
};

TextFeild.defaultProps = {
  error: "",
};
