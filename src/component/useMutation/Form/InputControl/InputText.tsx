import React from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";

export type TControl<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

type TProps<T extends FieldValues> = TControl<T>;

function InputText<T extends FieldValues>({ name, rules, control }: TProps<T>) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    rules,
    control,
  });

  return <input value={value} onChange={onChange} />;
}

export default InputText;
