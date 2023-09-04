import React, { useState } from "react";
import { TextInput } from "@mantine/core";
import "../components/field.scss";

export const InputStyled = (props: any) => {
  return <input {...props} value={props.value || ""} />;
};

export const InputsMantine = (props: any) => {
  const [value, setValue] = useState("");
  return (
    <TextInput
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange(e);
      }}
    />
  );
};
