import React, { createContext, useContext } from "react";
import { isArr, isValid } from "@formily/shared";
import { Field } from "@formily/core";
import { observer, useField } from "@formily/react";

//import { usePrefixCls } from '../__builtins__'

const PlaceholderContext = createContext<React.ReactNode>("N/A");

const usePlaceholder = (value?: any) => {
  const placeholder = useContext(PlaceholderContext) || "N/A";
  return isValid(value) && value !== "" ? value : placeholder;
};
const Select: React.FC<React.PropsWithChildren<any>> = observer(
  (props): any => {
    const field = useField<Field>();
    //const prefixCls = usePrefixCls('form-text', props)
    const dataSource: any[] = field?.dataSource?.length
      ? field.dataSource
      : props?.options?.length
      ? props.options
      : [];
    const placeholder = usePlaceholder();
    const getSelected = () => {
      const value = props.value;
      if (props.mode === "multiple" || props.mode === "tags") {
        if (props.labelInValue) {
          return isArr(value) ? value : [];
        } else {
          return isArr(value)
            ? value.map((val) => ({ label: val, value: val }))
            : [];
        }
      } else {
        if (props.labelInValue) {
          return isValid(value) ? [value] : [];
        } else {
          return isValid(value) ? [{ label: value, value }] : [];
        }
      }
    };

    const getLabel = (target: any) => {
      const labelKey = props.fieldNames?.label || "label";
      return (
        dataSource?.find((item) => {
          const valueKey = props.fieldNames?.value || "value";
          return item[valueKey] === target?.value;
        })?.[labelKey] ||
        target.label ||
        placeholder
      );
    };

    const getLabels = () => {
      const selected = getSelected();
      if (!selected.length) return placeholder;
      if (selected.length === 1) return getLabel(selected[0]);
      return selected.map((item, key) => {
        return <span key={key}>{getLabel(item)}</span>;
      });
    };
    return <div style={props.style}>{getLabels()}</div>;
  }
);
const DatePicker: React.FC<React.PropsWithChildren<any>> = (props) => {
  const getLabels = () => {
    const labels = props.value;
    console.log({ labels });
    return isArr(labels) ? labels.join("~") : labels;
  };
  return <div>{getLabels()}</div>;
};

const Text = (props: React.PropsWithChildren<any>) => {
  //const prefixCls = usePrefixCls("form-text", props);
  console.log(props);
  return <div style={props.style}>{usePlaceholder(props.value)}</div>;
};
Text.Select = Select;
Text.DatePicker = DatePicker;
export const PreviewText = Text;

export default PreviewText;
