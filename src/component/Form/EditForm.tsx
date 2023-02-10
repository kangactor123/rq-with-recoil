import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { getFormData, postFormData } from "src/api";
import { KEY_FORM } from "src/utils/queryKey";
import { TForm } from "src/utils/type";
import { InputText } from "./InputControl";

export default function Form() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [canBack, setCanBack] = useState(false);
  const { control, reset, handleSubmit } = useForm<TForm>({
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

  // post 성공 이후 Cache 되어있는 데이터를 업데이트 된 데이터로 set 해줍니다.
  const { mutate } = useMutation(postFormData, {
    onSuccess: ({ data }: { data: TForm }) => {
      setCanBack(true);
      queryClient.setQueryData<TForm>(KEY_FORM, data);
    },
  });

  const onSubmit = (data: TForm) => {
    mutate(data);
  };

  const handleBackButton = () => {
    navigate("/form");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button>Save</button>
      </form>
      <button onClick={handleBackButton} disabled={!canBack}>
        goBack
      </button>
    </div>
  );
}
