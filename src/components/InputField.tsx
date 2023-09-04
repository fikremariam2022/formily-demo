import "./field.scss";
import React, { ChangeEvent, useState } from "react";
const InputField = (props: any) => {
  const {
    label,
    name,
    type,
    value,
    placeholder,
    required,

    helpText,
    minValue,
    maxValue,
    onChange,
  } = props;
  const [errorMessage, setErrorMessag] = useState("");
  const onBlur = () => {
    if (value === "") {
      setErrorMessag("Value is required");
    }
  };
  const onChangeSelf = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessag("");
    onChange(e);
  };
  return (
    <div className="field">
      <label>{label}</label>
      {required && <span className="required"> *</span>}
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        required={true}
        onChange={(e) => onChangeSelf(e)}
        onBlur={onBlur}
        value={value}
        min={minValue}
        max={maxValue}
      />
      {helpText && <span className="help-text">{helpText}</span>}
      <span className="error">{errorMessage}</span>
    </div>
  );
};

export default React.memo(InputField);
