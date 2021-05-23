import React from "react";
import PropTypes from "prop-types";

export const FormHeading = ({ text }) => (
  <h1 className="text-2xl text-gray-600 font-bold mb-4 italic m-2 ">{text}</h1>
);

FormHeading.propTypes = {
  text: PropTypes.string.isRequired,
};
