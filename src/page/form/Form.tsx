import React from "react";
import { useQuery } from "@tanstack/react-query";
import { KEY_FORM } from "src/utils/queryKey";
import { getFormData } from "src/api";
import { useNavigate } from "react-router";

function Form() {
  const { data } = useQuery(KEY_FORM, getFormData);
  const navigate = useNavigate();
  const handleEditButton = () => {
    navigate("/edit");
  };
  return (
    <div>
      <h1>this is Detail Page</h1>
      <div>id: {data?.id}</div>
      <div>name: {data?.name}</div>
      <div>nickname: {data?.nickname}</div>
      <button onClick={handleEditButton}>Edit</button>
    </div>
  );
}

export default Form;
