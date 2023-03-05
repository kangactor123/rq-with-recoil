import React, { useEffect, useState } from "react";
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
  // 세 번째 제네릭 타입으로 select 의 리턴되는 타입을 지정해줄 수 있습니다.
  const { data, isLoading, error } = useQuery<TData[], TError, TData[]>(
    Query_KEY,
    queryFn,
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
      onSettled: (data, error) => console.log(data, error),
      select: (data) => data.filter((obj) => obj.d1 === "d1"),
    }
  );

  const [enabled, setEnabled] = useState(true);
  // refetchInterval 을 활용해 polling 을 구현할 수 있습니다.
  // 원하는 시점에 패칭을 그만하게 하고 싶다면 enabled 를 활용할 수 있습니다.
  useQuery<TData[], Error>([...Query_KEY, "polling"], queryFn, {
    refetchInterval: 500,
    enabled,
  });

  // 특정 시간 도달 시 enabled 를 false 하여 주기적인 패칭을 멈추게 하는 effect 입니다.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setEnabled((prev) => !prev);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

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
