import { Calendar } from "@mantine/dates";
// import { mapProps, connect, mapReadPretty } from "@formily/react";
// import PreviewText from "../core/preview-text";
import React from "react";

const DateDefault = ({ value, onChange }: any) => {
  const handleDateChange = (date: Date) => {};
  return <Calendar onDateChange={(date) => handleDateChange(date)} />;
};

const Date = (props: any) => {
  console.log(props);
  return <DateDefault value={props.value} onChange={props.onChange} />;
};
export default Date;
