import React, { PropsWithChildren } from "react";

const FormItem = ({ children }: any) => {
  console.log(children);
  const errorMessage = children.props?.errorMessage;
  if (!errorMessage)
    return <div style={{ border: "1px solid red" }}>{children}</div>;

  return children;
};

export default FormItem;
