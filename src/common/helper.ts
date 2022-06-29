import { queryClient } from "..";

export function queryInvalidate(key: string | string[]) {
  queryClient.invalidateQueries(key);
}
