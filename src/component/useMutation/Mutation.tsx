import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

enum Status {
  None = "None",
  Loading = "Loading",
  Success = "Success",
  Error = "Error",
}

type TData = {
  before: number;
  after: number;
};

type TError = {
  status: string;
  message: string;
};

const Query_KEY = ["query"];
const mutationFn = async (req: number): Promise<TData> => {
  const data: TData = await fetch("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify({
      data: req,
    }),
  }).then((res) => res.json());
  return data;
};

function Mutation() {
  const [status, setStatus] = useState(Status.None);
  const [count, setCount] = useState(0);
  const client = useQueryClient();
  const { mutate, data, error } = useMutation<TData, TError, number>(
    (req: number) => mutationFn(req),
    {
      onSettled: () => setStatus(Status.Loading),
      onSuccess: () => {
        setStatus(Status.Success);
        client.invalidateQueries(Query_KEY);
      },
      onError: () => setStatus(Status.Error),
    }
  );

  const handleMutate = useCallback(() => {
    mutate(count);
  }, [mutate, count]);

  const handleIncrease = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleDecrease = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <p>{status}..</p>
      <p>{count}</p>
      <button onClick={handleIncrease}>+</button>
      <button onClick={handleDecrease}>-</button>
      <button onClick={handleMutate}>Mutate</button>
      <div>
        <span>d1: {data?.before}</span>
        <span>d2: {data?.after}</span>
      </div>
    </div>
  );
}

export default Mutation;
