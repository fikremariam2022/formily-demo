import React, { createContext, useContext, useEffect } from "react";
import "./components/field.scss";
import { createForm, setValidateLanguage } from "@formily/core";
import { observer } from "@formily/reactive-react";
import { InputStyled, InputsMantine } from "./components/Inputs";
import SelectHtml from "./components/SelectHtml";

import {
  Select as AntdSelectImported,
  Checkbox as CheckboxAntdImported,
  DatePicker as DatePickerAntd,
} from "antd";

import { DatePicker } from "@mantine/dates";
import { randomId } from "@mantine/hooks";

import {
  CheckBoxAntd,
  CheckBoxMantine,
  CheckboxStyled,
  CheckboxGroupMantine,
} from "./components/Checkboxes";

import { RadioGroupMantine, RadioGroupAntd } from "./components/RadioGroups";

const { RangePicker } = DatePickerAntd;

//Create a context to facilitate Field consumption
const FormContext = createContext();
//Create a context to facilitate the consumption of FormItem
const FieldContext = createContext();

//State bridge component
const Field = observer((props) => {
  const form = useContext(FormContext);
  //Create a field
  const field = form.createField(props);
  useEffect(() => {
    //Mount field
    field.onMount();
    return () => {
      //Unload field
      field.onUnmount();
    };
  });
  if (!field.visible || field.hidden) return null;
  //Render the field, associate the field state with the UI component
  const component = React.createElement(field.component[0], {
    ...field.component[1],
    value: field.value,
    onChange: field.onInput,
  });

  //Render field wrapper
  const decorator = React.createElement(
    field.decorator[0],
    field.decorator[1],
    component
  );

  return (
    <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>
  );
});

// FormItem UI component
const FormItem = observer(({ children }) => {
  const field = useContext(FieldContext);
  return (
    <div>
      <div style={{ height: 20 }}>{field.title}:</div>
      {children}
      <div style={{ height: 20, fontSize: 12, color: "red" }}>
        {field.selfErrors.join(",")}
      </div>
    </div>
  );
});

//Form management entrance
const FormProvider = (props) => {
  useEffect(() => {
    //Mount form
    props.form?.onMount();
    return () => {
      //Uninstall the form
      props.form?.onUnmount();
    };
  });
  return (
    <FormContext.Provider value={props.form}>
      {props.children}
    </FormContext.Provider>
  );
};

//Form response monitor
const FormConsumer = observer((props) => {
  const form = useContext(FormContext);
  return <div>{props.children(form)}</div>;
});

/*
 * The above logic has been implemented in @formily/react or @formily/vue, and there is no need to rewrite it in actual use
 */

//Switch the built-in check internationalization copy to English
setValidateLanguage("en");

const App = () => {
  const form = createForm({ validateFirst: true });

  const createPasswordEqualValidate = (equalName) => (field) => {
    if (
      form.values.confirm_password &&
      field.value &&
      form.values[equalName] !== field.value
    ) {
      field.selfErrors = ["Password does not match Confirm Password."];
    } else {
      field.selfErrors = [];
    }
  };

  return (
    <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
      <FormProvider form={form}>
        {
          //#region fields
        }
        <Field
          name="name"
          title="Input Styled Name"
          required
          decorator={[FormItem]}
          component={[InputStyled, { placeholder: "Please Input" }]}
        />
        <Field
          name="password"
          title="Input Styled Password"
          required
          decorator={[FormItem]}
          component={[
            InputStyled,
            { type: "password", placeholder: "Please Input" },
          ]}
          reactions={createPasswordEqualValidate("confirm_password")}
        />
        <Field
          name="confirm_password"
          title="Input Styled Confirm Password"
          required
          decorator={[FormItem]}
          component={[
            InputStyled,
            { type: "password", placeholder: "Please Input" },
          ]}
          reactions={createPasswordEqualValidate("password")}
        />
        <Field
          name="select_single"
          title="Select Item"
          required
          decorator={[FormItem]}
          component={[
            SelectHtml,
            {
              options: [
                { label: "One", value: "One" },
                { label: "Two", value: "Two" },
                { label: "Three", value: "Three" },
              ],
            },
          ]}
        />
        <Field
          name="antd_select_multiple"
          title="Antd Select Multiple"
          required
          decorator={[FormItem]}
          component={[
            AntdSelectImported,
            {
              mode: "multiple",
              options: [
                { label: "Javascript", value: "Javascript" },
                { label: "Vue", value: "Vue" },
                { label: "React", value: "React" },
                { label: "Angula", value: "Angular" },
                { label: "Angularjs", value: "Angularjs" },
              ],
              style: { width: "100%" },
            },
          ]}
        />
        <Field
          name="mantin_input"
          title="Mantin Input"
          required
          decorator={[FormItem]}
          component={[InputsMantine, { placeholder: "Please Input" }]}
        />
        <Field
          name="mantin_calender"
          title="Mantin Calender"
          required
          decorator={[FormItem]}
          component={[DatePicker]}
        />
        <Field
          name="dateRange_picker_mantine"
          title="Date Range Picker Mantine"
          required
          decorator={[FormItem]}
          component={[DatePicker, { type: "range" }]}
        />
        <Field
          name="antd_datePicker"
          title="Antd Date Picker"
          required
          decorator={[FormItem]}
          component={[DatePickerAntd]}
        />
        <Field
          name="antd_date_range_Picker"
          title="Antd Date Range Picker"
          required
          decorator={[FormItem]}
          component={[RangePicker]}
        />
        <Field
          name="mantin_checkbox"
          title="Mantin Checkbox"
          required
          decorator={[FormItem]}
          component={[CheckBoxMantine]}
        />
        <Field
          name="antd_checkbox"
          title="AntD Checkbox"
          required
          decorator={[FormItem]}
          component={[CheckBoxAntd]}
        />
        <Field
          name="ceckbox_html"
          title="Html Checkbox"
          required
          decorator={[FormItem]}
          component={[CheckboxStyled]}
        />
        <Field
          name="ceckbox_group_antd"
          title="Checkbox Group Antd"
          required
          decorator={[FormItem]}
          component={[
            CheckboxAntdImported.Group,
            { options: optionsWithDisabled },
          ]}
        />
        <Field
          name="ceckbox_group_mantine"
          title="Checkbox Group Mantine"
          required
          decorator={[FormItem]}
          component={[
            CheckboxGroupMantine,
            {
              options: [
                {
                  label: "Receive email notifications",
                  checked: false,
                  value: "email",
                  key: randomId(),
                },
                {
                  label: "Receive sms notifications",
                  checked: false,
                  value: "sms",
                  key: randomId(),
                },
                {
                  label: "Receive push notifications",
                  checked: false,
                  value: "push",
                  key: randomId(),
                },
              ],
            },
          ]}
        />
        <Field
          name="radio_group_mantine"
          title="Radio Button Mantine"
          required
          decorator={[FormItem]}
          component={[
            RadioGroupMantine,
            {
              options: [
                {
                  label: "Receive email notifications",
                  checked: false,
                  value: "email",
                  key: randomId(),
                },
                {
                  label: "Receive sms notifications",
                  checked: false,
                  value: "sms",
                  key: randomId(),
                },
                {
                  label: "Receive push notifications",
                  checked: false,
                  value: "push",
                  key: randomId(),
                },
              ],
            },
          ]}
        />
        <Field
          name="radio_group_antd"
          title="Radio Group Antd"
          required
          decorator={[FormItem]}
          component={[
            RadioGroupAntd,
            {
              options: [
                {
                  label: "Receive email notifications",
                  checked: false,
                  value: "email",
                  key: randomId(),
                },
                {
                  label: "Receive sms notifications",
                  checked: false,
                  value: "sms",
                  key: randomId(),
                },
                {
                  label: "Receive push notifications",
                  checked: false,
                  value: "push",
                  key: randomId(),
                },
              ],
            },
          ]}
        />

        {
          //#endregion fields
        }
        <code>
          <pre>
            <h2>Form Values</h2>
            <FormConsumer>
              {(form) => JSON.stringify(form.values, null, 2)}
            </FormConsumer>
          </pre>
        </code>
      </FormProvider>
    </div>
  );
};
export default App;
const optionsWithDisabled = [
  { label: "Apple", value: "Apple" },
  { label: "Pear", value: "Pear" },
  { label: "Orange", value: "Orange", disabled: false },
];
