import { useState } from "react";
import { Radio as RadioMantine } from "@mantine/core/";
import { Radio as RadioAntd } from "antd";
import React from "react";

export function RadioGroupMantine(props: any) {
  const [value, setValue] = useState("react");
  const children = props.options.map((a: any) => (
    <RadioMantine key={a.key ?? a.value} value={a.value} label={a.label} />
  ));

  return (
    <RadioMantine.Group
      value={value}
      onChange={(val) => {
        setValue(val);
        props.onChange(val);
      }}
      label="Select your favorite framework/library"
      description="This is anonymous"
      required
      children={children}
    />
  );
}

export function RadioGroupAntd(props: any) {
  const [value, setValue] = useState("react");

  return (
    <RadioAntd.Group
      options={props.options ?? []}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange(e.target.value);
      }}
      value={value}
      optionType="button"
      buttonStyle="solid"
    />
  );
}
