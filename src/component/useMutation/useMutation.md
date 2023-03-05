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

# useQuery/useMutation

- useQuery 는 선언적이지만, useMutation 은 명령적입니다.
- 원하는 시점에 mutate 혹은 mutateAsync 메서드를 활용해 mutate 명령을 내릴 수 있습니다.

# useMutation 의 매개변수 options

- 자주 사용되는 option 값을 위주로 나열했습니다.

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

# useMutation 의 매개변수 options

### data/error

- mutation 의 결과로 반환되는 data와 error 객체 입니다.

### mutate/mutateAsync

- useMutation 은 mutate 명령을 위해 위 두 메서드를 반환합니다.
- 두 메서드의 차이는 mutate 는 아무것도 반환하지 않지만 mutateAsync 는 Promise 를 반환한다는 것 입니다.

```
mutate(params);
const promise = mutateAsync(params);
```
