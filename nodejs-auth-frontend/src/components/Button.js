import React from "react";
import PropTypes from "prop-types";

export const Button = ({ disabled, secondary, text, handleClick, target }) => (
  <button
    disabled={disabled}
    className={
      secondary
        ? "btn bg-white text-pink-600 border-4 border-pink-600 py-2 hover:text-white focus:text-white active:text-black disabled:bg-white disabled:text-gray-500 disabled:border-gray-200 hover:border-pink-800 active:border-pink-500 focus:border-pink-800"
        : "btn bg-pink-600 text-white disabled:text-gray-500 disabled:bg-gray-200"
    }
    onClick={() => handleClick(target)}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  target: PropTypes.object,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  target: {},
  secondary: false,
  disabled: false,
};
