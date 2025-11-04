import React from "react";
import StyleCss from "./FormComponent.module.css";

const FormInput = ({ type, placeholder, value, onChange, invalid }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${StyleCss["form__input"]} ${
        invalid ? StyleCss["form__input--invalid"] : ""
      }`}
      {...(type === "date" && { max: today })}
    />
  );
};

export default FormInput;
