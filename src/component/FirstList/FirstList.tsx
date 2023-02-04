import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getList, postPersonInList } from "src/api";
import { IList } from "src/utils/type";
import { KEY_LIST } from "src/utils/queryKey";
import { MAIN_PAGE_PATH } from "src/utils/routePath";

export const Wrapper = styled.div``;

// invalidateQueries : QueryClient 에서 제공하는 메서드로, 주어지는 키에 매칭되는 쿼리를 stale 한 상태로 만들어서 리패칭 하게 하는 메서드
// 기본적으로 키를 제공했을 경우 배열속에 같은 키가 들어있다면 매칭되는 모든 쿼리들이 stale 하게 상태가 변화됨
// { exact: true } 옵션을 넣어주면 정확히 매칭이 가능.
function FirstList() {
  const location = useLocation();
  const queryClient = useQueryClient();

  // const { data, isLoading } = useQuery<IList[], Error, number>( // 세 번째 제네릭 타입으로 select 의 리턴되는 타입을 지정해줄 수 있음
  const { data, isLoading } = useQuery<IList[], Error>( // 세 번째 제네릭 타입으로 select 의 리턴되는 타입을 지정해줄 수 있음
    KEY_LIST,
    getList
    // {
    //   select: (data) => {
    //     return data.length;
    //   },
    // }
  );

  const { mutate, isError: isMutateError } = useMutation(postPersonInList, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEY_LIST);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClick = () => {
    mutate({ name: "yyy", age: "111" });
    if (isMutateError) {
      console.log("mutation error");
    }
  };

  if (isLoading) return <div>isLoading...</div>;

  return isLoading ? null : (
    <Wrapper>
      <h1>this is FirstList</h1>
      <ul>
        {data?.map((item, index) => (
          <li key={index}>
            <span>name: </span>
            {item.name}
            <br />
            <span>age: </span>
            {item.age}
            <br />
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>Add Person(invalidate On)</button>
      <br />
      {location.pathname !== MAIN_PAGE_PATH && <Link to="/">goMain</Link>}
    </Wrapper>
  );
}

export default FirstList;
