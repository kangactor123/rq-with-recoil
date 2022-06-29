import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { getList, postPersonInList } from "../common/api";
import { queryInvalidate } from "../common/helper";
import { KEY_LIST } from "../common/key";
import { IList } from "../common/type";

export const Wrapper = styled.div``;

function FirstList() {
  const { data, isLoading } = useQuery<IList[]>(KEY_LIST, getList);
  const { mutate, isError: isMutateError } = useMutation(postPersonInList, {
    onSuccess: () => queryInvalidate(KEY_LIST),
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
    </Wrapper>
  ); // Error 시 컴포넌트
}

export default FirstList;
