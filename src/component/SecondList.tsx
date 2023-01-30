import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { getList, postPersonInList } from "src/api";
import { KEY_LIST } from "src/utils/queryKey";
import { MAIN_PAGE_PATH } from "src/utils/routePath";
import { IList } from "src/utils/type";

function SecondList() {
  const location = useLocation();
  const { data, isLoading, isError } = useQuery<IList[]>([KEY_LIST], getList);
  const { mutate, isError: isMutateError } = useMutation(postPersonInList);

  const handleClick = () => {
    mutate({ name: "zzz", age: "222" });
    if (isMutateError) {
      console.log("mutation error");
    }
  };

  if (isLoading) return <div>isLoading...</div>;
  if (isError) return <div>isError...</div>;

  return (
    <div>
      <h1>this is SecondList</h1>
      <ul>
        {data?.map(({ name, age }, index) => (
          <li key={index}>
            <span>name: {name}</span>
            <br />
            <span>age: {age}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>Add Person</button>
      <br />
      {location.pathname !== MAIN_PAGE_PATH && <Link to="/">goMain</Link>}
    </div>
  );
}

export default SecondList;
