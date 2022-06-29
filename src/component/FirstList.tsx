import { useMutation, useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getList, postPersonInList } from "../common/api";
import { queryInvalidate } from "../common/helper";
import { KEY_LIST } from "../common/key";
import { IList } from "../common/type";
import { MAIN_PAGE_PATH } from "../Router";

export const Wrapper = styled.div``;

function FirstList() {
  const { data, isLoading } = useQuery<IList[]>(KEY_LIST, getList);
  const { mutate, isError: isMutateError } = useMutation(postPersonInList, {
    onSuccess: () => queryInvalidate(KEY_LIST),
  });

  const location = useLocation();
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
  ); // Error 시 컴포넌트
}

export default FirstList;
