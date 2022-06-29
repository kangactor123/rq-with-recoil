import { useMutation, useQuery } from "react-query";
import { getList, postPersonInList } from "../common/api";
import { KEY_LIST } from "../common/key";
import { IList } from "../common/type";
import { Wrapper } from "./FirstList";

function SecondList() {
  const { data, isLoading, isError } = useQuery<IList[]>(KEY_LIST, getList);
  const { mutate, isError: isMutateError } = useMutation(postPersonInList);

  const handleClick = () => {
    mutate({ name: "zzz", age: "222" });
    if (isMutateError) {
      console.log("mutation error");
    }
  };

  if (isLoading) return <div>isLoading...</div>;

  return !isError ? (
    <Wrapper>
      <h1>this is SecondList</h1>
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
      <button onClick={handleClick}>Add Second Person</button>
    </Wrapper>
  ) : null; // Error 시 컴포넌트
}

export default SecondList;
