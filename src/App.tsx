import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { errorAtom } from "./common/atom";
import Router from "./Router";

function App() {
  const [error, setError] = useRecoilState(errorAtom);
  const queryClient = useQueryClient();
  queryClient.setDefaultOptions({
    queries: {
      onError: (err) => {
        setError((prev) => [...prev, (err as any).message as string]);
      },
      retry: 1,
    },
  });
  return (
    <>
      {error.length !== 0 &&
        error.map((err, index) => {
          return <div key={index}>{err}</div>;
        })}
      <Router />
    </>
  );
}

export default App;
