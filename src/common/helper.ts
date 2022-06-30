import { queryClient } from "..";

// invalidateQueries : QueryClient 에서 제공하는 메서드로, 주어지는 키에 매칭되는 쿼리를 stale 한 상태로 만들어서 리패칭 하게 하는 메서드
export function queryInvalidate(key: string | string[]) {
  queryClient.invalidateQueries(key);
}
