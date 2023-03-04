```
const {
  data,
  error,
  isError,
  isIdle,
  isLoading,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
} = useMutation({
  mutationFn,
  cacheTime,
  mutationKey,
  networkMode,
  onError,
  onMutate,
  onSettled,
  onSuccess,
  retry,
  retryDelay,
  useErrorBoundary,
  meta
})
```

# useMutation 의 매개변수 options

## 자주 사용되는 option 값을 위주로 나열했습니다.

### mutationFn

- (variables: TVariables): Promise<T>;
- 필수값입니다. 만약 default mutation function 을 지정했다면 넣어주지 않아도 좋습니다.

### onMutate

- (variables: TVariables): Promise<TContext | void> | TContext | void;
- onMutate 에 넣어주는 콜백 함수는 mutate 가 실행되기 이전에 실행됩니다.

### onSuccess

- (data: TData, variables: TVariables, context?: TContext): Promise<unknown> | unknown;
- onSuccess 에 넣어주는 콜백 함수는 mutation 이 성공했을 때 실행됩니다.
- 만약 Promise 가 리턴된다면, 해당 프로미스가 Resolved 될 때 까지 실행되지 않고 await 됩니다.

### onError

- (err: TError, variables: TVariables, context?: TContext): Promise<unknown> | unknown;
- onError 에 넣어주는 콜백 함수는 mutation 의 결과가 error 일 때 실행됩니다.
- 만약 Promise 가 리턴된다면, 해당 프로미스가 Resolved 될 때 까지 실행되지 않고 await 됩니다.
