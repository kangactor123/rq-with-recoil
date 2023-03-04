# useQuery

```
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isPaused,
  isLoading,
  isLoadingError,
  isPlaceholderData,
  isPreviousData,
  isRefetchError,
  isRefetching,
  isInitialLoading,
  isStale,
  isSuccess,
  refetch,
  remove,
  status,
  fetchStatus,
} = useQuery({
  queryKey,
  queryFn,
  cacheTime,
  enabled,
  networkMode,
  initialData,
  initialDataUpdatedAt,
  keepPreviousData,
  meta,
  notifyOnChangeProps,
  onError,
  onSettled,
  onSuccess,
  placeholderData,
  queryKeyHashFn,
  refetchInterval,
  refetchIntervalInBackground,
  refetchOnMount,
  refetchOnReconnect,
  refetchOnWindowFocus,
  retry,
  retryOnMount,
  retryDelay,
  select,
  staleTime,
  structuralSharing,
  suspense,
  useErrorBoundary,
})
```

# useQuery 의 매개변수 options

- 자주 사용되는 option 값을 위주로 나열했습니다.

### queryKey

- 필수값 (Required)
- 쿼리의 키로써 해당 query 를 관리하는데 사용됩니다.
- 문자열 배열 (string[]) 으로 계층적으로 관리합니다.
- 예시: 애플 > 아이폰/에어팟/아이패드 ["apple", "iphone"] / ["apple", "airpods"] / ["apple", "ipad"]

### queryFn

- 형태: (context:QueryFunctionContext): Promise<T>
- 데이터를 쿼리할 함수를 넣어줍니다.
- 해당 함수는 반드시 resolve, error 를 담고있는 `Promise<T>` 를 리턴합니다. 데이터는 `undefined` 일수가 없습니다.
- 필수로 넣어줘야 하는 옵션이지만, 만약 defaultQuery 를 설정했다면 필수로 넣어주지 않아도 됩니다.
- <a href="https://tanstack.com/query/latest/docs/react/guides/default-query-function" targe="_blank">defaultQuery 알아보기></a>
- <a href="https://tanstack.com/query/latest/docs/react/guides/query-functions#queryfunctioncontext" targe="_blank">매개변수로 받는 context 알아보기></a>

### enabled

- query 를 실행할지 말지 설정하는 옵션입니다.
- default 값은 true 이며 조건에 따라서 false 를 넣어 query 를 패칭하지 않게 할 수 있습니다.

### networkMode

- networkMode 는 react-query v4 에 새로 나온 기능입니다.
- 네트워크의 상태 여부에 따라서 쿼리의 상태를 결정할 수 있습니다.
- 'online', 'always', 'offlineFirst' 값이 들어갈 수 있습니다.

### retry

- query 가 실패했을 시 재실행 여부를 설정할 수 있습니다.
- boolean/number/(failureCount, error): boolean 을 넣어줄 수 있습니다.
- true 값을 넣어줄 시 infinitely 하게 재시도 합니다.

### retryOnMount

- 컴포넌트가 마운트 했을 시 재실행 여부를 설정합니다.

### retryDelay

- number/(retryAttempt: number, error: TError): number
- retry 할 시 딜레이 시킬 시간을 설정해줍니다.

### staleTime

- 해당 쿼리가 stale 상태로 변할 시간을 설정해줍니다.
- number/Infinity 값이 들어가며, Infinity 로 설정 시 해당 쿼리는 절대 stale 하다고 판단되지 않습니다.
- default 값은 0 입니다.

### cacheTime

- 해당 쿼리의 캐싱이 유지되는 시간을 설정해줍니다.
- number/Infinity 값이 들어갑니다.
- default 값은 5 _ 60 _ 1000 (5분) 이며 SSR(서버 사이드 랜더링) 일 경우 값은 infinity 입니다.

### refetchOnMount

- 해당 컴포넌트가 마운트 되었을 시 refetch 할지 여부를 결정하는 옵션입니다.
- boolean/"always"/((query: Query) => boolean | "always") 값이 들어갑니다.
- "always" 값이 들어갈 경우 해당 쿼리는 컴포넌트가 마운트 되었을 시 항상 리패치 합니다.

### refetchOnWindowFocus

- 브라우저에 포커스 되었을 시의 리패치 여부를 설정하는 옵션입니다.
- 값은 refetchOnMount 와 같습니다.

### refetchOnReconnect

- 네트워크가 다시 연결되었을 시 리패치 여부를 설정하는 옵션입니다.
- 값은 refetchOnMount 와 같습니다.

### notifyOnChangeProps

- string[]/"all"
- ['data', 'error']: 배열 안에 들어간 항목이 변할때 컴포넌트를 리랜더 시킵니다.
- 'all' 옵션을 줄 경우 쿼리가 업데이트 될 때 마다 컴포넌트를 업데이트 시킵니다.

### onSuccess

- (data: TData): void
- 쿼리가 성공했을 때 실행할 콜백함수를 넣어줍니다.
- 매개변수인 data 는 항상 존재함을 보장 받습니다. (쿼리가 성공했을 시의 콜백이기 때문)

### onError

- (error: TError): void
- 쿼리가 실패했을 때 실행할 콜백함수를 넣어줍니다.

### onSettled

- (data?: TData, error?: TError): void
- 쿼리가 실행된 이후 실행될 콜백 함수를 넣어줍니다.
- 매개변수로 들어올 data 와 error 객체는 보장받지 못합니다. (성공할지 실패할지 모르기 때문)

### select

- (data: TData): unknown
- 쿼리에 성공한 데이터를 변경시킬수 있습니다.
- 반환받은 값에서 필요한 데이터만을 집어서 반환할 수 있고, 쿼리해온 데이터의 모습은 변형시킬 수 있습니다.

### initialData

- TData/(): TData
- 쿼리를 실행하기 전 초기 데이터를 넣어줄 수 있습니다.
- 해당 쿼리가 생성 혹은 캐싱 되기 전까지 캐싱되는 쿼리값 입니다.
- 값으로 함수를 넣어준다면, 해당 함수는 루트 쿼리 (쿼리 클라이언트)가 초기화 될 때 동기적으로 단 <b>한번</b> 실행되어서 initialData 를 채워줍니다.
- 해당 값은 staleTime 을 설정하지 않는다면 stale 한 상태라고 여겨집니다.
- initialData 값은 캐싱됩니다.

### placeholderData

- TData/(): TData
- 해당 값을 넣어줄 경우 해당 쿼리가 loading 인 상태이거나, initialData 를 넣어주지 않는 경우에 쿼리의 데이터로 제공됩니다.
- initialData 와는 다르게 캐싱되지 않습니다.
  <br/>

# useQuery 의 return 객체

- 자주 사용되는 property 위주로 나열했습니다.
  <br/>

### status

- "loading"/"error"/"success" 상태를 담고 있습니다.
- loading: 캐싱된 데이터가 없거나, 쿼리가 아직 실행되지 않은 상태
- error: 쿼리가 에러를 반환한 경우
- success: 쿼리가 성공적으로 데이터를 반환한 경우
  <br/>

## 아래 상태값은 boolean 값 입니다.

### isLoading

### isSuccess

### isError

### isLoadingError

### isRefetchError

### isStale

### isPlaceholderData

### isPreviousData

### isFetched

### isFetchedAfterMount

### isFetching

### isPaused

### isRefetching

### isInitialLoading

<br/>

## data/error/refetch

### data

- 기본 값은 undefined 입니다.
- status 가 success 일 시 데이터가 resolved 됩니다.

### error

- 기본 값은 null 입니다.
- status 가 error 일 시 에러 객체가 thrown 됩니다.

### refetch

- (options: { throwOnError: boolean, cancelRefetch: boolean }): Promise<UseQueryResult>
- 수동적으로 쿼리를 리패칭할 수 있는 함수입니다.
