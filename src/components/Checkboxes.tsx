import React, { useEffect, useState } from "react";
import { Checkbox as CheckBoxMantineImported } from "@mantine/core";
import { Checkbox as CheckboxAntdImported } from "antd";
import { useListState } from "@mantine/hooks";

export const CheckboxStyled = (props: any) => {
  const [state, setState] = useState<boolean>();
  return (
    <input
      type="checkbox"
      onChange={(e) => {
        setState(e.currentTarget.checked);
        props.onChange(e);
      }}
      value={state ? "on" : "off"}
    />
  );
};

export const CheckBoxMantine = (props: any) => {
  const [state, setState] = useState<boolean>();
  return (
    <CheckBoxMantineImported
      onChange={(e: any) => {
        setState(e.currentTarget.checked);
        props.onChange(e.currentTarget.value);
      }}
      value={state ? "on" : "off"}
    />
  );
};

export const CheckBoxAntd = (props: any) => {
  const [state, setState] = useState<boolean>(false);
  useEffect(() => {
    props.onChange(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <CheckboxAntdImported
      onChange={(e: any) => {
        setState(e.target.checked);
        // props.onChange(e);
      }}
      value={state.toString()}
      checked={state}
    />
  );
};

export const CheckboxGroupMantine = (props: any) => {
  const options = props.options ?? [];
  const [values, handlers] = useListState<{
    label: string;
    value: string;
    checked: boolean;
    key: string;
    disabled?: boolean;
  }>(options);

  React.useEffect(() => {
    props.onChange(values.filter((v) => v.checked).map((v) => v.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const items = values.map((value: any, index: number) => (
    <CheckBoxMantineImported
      mt="xs"
      ml={33}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) => {
        handlers.setItemProp(index, "checked", event.currentTarget.checked);
      }}
    />
  ));
  return items;
};
