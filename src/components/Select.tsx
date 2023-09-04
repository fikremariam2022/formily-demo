//import React from 'react'
import { connect, mapReadPretty, mapProps } from "@formily/react";
import SelectHtml from "./SelectHtml";
//import { SelectProps } from 'antd/lib/select'
import { PreviewText } from "../core/preview-text";
//import { LoadingOutlined } from '@ant-design/icons'

export const Select: any = connect(
  SelectHtml,
  mapProps(
    {
      dataSource: "options",
      loading: true,
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon: props.suffixIcon,
      };
    }
  ),
  mapReadPretty(PreviewText.Select)
);

export default Select;
