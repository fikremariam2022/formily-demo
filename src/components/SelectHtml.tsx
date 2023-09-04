import React from "react";

const SelectHtml = (props: any) => {
  const options = props.options ?? [];
  return (
    <select {...props} value={props.value}>
      {options?.map((e: any) => (
        <option key={e.value.toString()} value={e.value}>
          {e.label}
        </option>
      ))}
    </select>
  );
};

export default SelectHtml;
