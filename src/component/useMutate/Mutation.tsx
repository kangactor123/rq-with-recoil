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
        // invalidateQueries : QueryClient 에서 제공하는 메서드로, 주어지는 키에 매칭되는 쿼리를 stale 한 상태로 만들어서 리패칭 하게 하는 메서드
        // 기본적으로 키를 제공했을 경우 배열속에 같은 키가 들어있다면 매칭되는 모든 쿼리들이 stale 하게 상태가 변화됨
        // { exact: true } 옵션을 넣어주면 정확히 매칭이 가능.
        client.invalidateQueries(Query_KEY);
      },
      onError: (err) => {
        setStatus(Status.Error);
        // setQueryData: mutation 성공 후 해당 서버 데이터를 패칭하지 않고도 데이터를 바꿔줄 수 있음
        // cached 된 쿼리의 데이터를 즉시 변경해줌
        client.setQueryData([Query_KEY, Status.Error], { err });
      },
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
