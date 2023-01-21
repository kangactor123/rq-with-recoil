import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { getList, postPersonInList } from "../api/api";
import { KEY_LIST } from "../utils/queryKey";
import { IList } from "../utils/type";
import { MAIN_PAGE_PATH } from "../Router";

function SecondList() {
  const { data, isLoading, isError } = useQuery<IList[]>([KEY_LIST], getList);
  const { mutate, isError: isMutateError } = useMutation(postPersonInList);
  const location = useLocation();

  const handleClick = () => {
    mutate({ name: "zzz", age: "222" });
    if (isMutateError) {
      console.log("mutation error");
    }
  };

  if (isLoading) return <div>isLoading...</div>;

  return !isError ? (
    <div>
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
      <br />
      {location.pathname !== MAIN_PAGE_PATH && <Link to="/">goMain</Link>}
    </div>
  ) : null; // Error 시 컴포넌트
}

export default SecondList;
