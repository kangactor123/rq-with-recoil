import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { getFormData } from "src/api";
import { KEY_FORM } from "src/utils/queryKey";
import { InputText } from "./InputControl";

export type TForm = {
  id: string;
  name: string;
  nickname: string;
};

export default function Form() {
  const { control, reset } = useForm<TForm>({
    defaultValues: {
      id: "",
      name: "",
      nickname: "",
    },
  });

  // react-query 를 통해 데이터를 패칭해온 후,
  // react-hook-form 에 reset 을 통해 데이터를 주입시킵니다.
  useQuery(KEY_FORM, getFormData, {
    onSuccess: (data: TForm) => {
      reset(data);
    },
  });

  return (
    <form>
      <div>
        <label>id: </label>
        <InputText control={control} name="id" />
      </div>
      <div>
        <label>name: </label>
        <InputText control={control} name="name" />
      </div>
      <div>
        <label>nickname: </label>
        <InputText control={control} name="nickname" />
      </div>
    </form>
  );
}
