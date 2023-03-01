import React from "react";
import { useQuery } from "@tanstack/react-query";

type TData = {
  d1: string;
  d2: string;
};

type TError = {
  status: string;
  message: string;
};

const Query_KEY = ["query"];
const queryFn = async (): Promise<TData[]> => {
  const data = await fetch("http://localhost:3000").then((res) => res.json());
  return data;
};

function Query() {
  const { data, isLoading, error } = useQuery<TData[], TError>(
    Query_KEY,
    queryFn,
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
      onSettled: (data, error) => console.log(data, error),
      select: (data) => data.filter((obj) => obj.d1 === "d1"),
    }
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return (
      <div>
        <div>{error.status}</div>
        <div>{error.message}</div>
      </div>
    );
  }

  return (
    <div>
      {data?.map(({ d1, d2 }, idx) => (
        <div key={idx}>
          <span>{d1}</span>
          <span>{d2}</span>
        </div>
      ))}
    </div>
  );
}

export default Query;
