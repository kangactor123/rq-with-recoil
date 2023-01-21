import Router from "./Router";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { ApiError, errorAtom } from "./recoil/error";

function App() {
  const [error, setError] = useRecoilState(errorAtom);
  const queryClient = useQueryClient();
  queryClient.setDefaultOptions({
    queries: {
      retry: 1,
      onError: (err) => {
        setError((prev) => [...prev, (err as ApiError).message]);
      },
    },
  });
  return (
    <div>
      {error.length !== 0 &&
        error.map((err, index) => {
          return <div key={index}>{err}</div>;
        })}
      <Router />
    </div>
  );
}

export default App;
