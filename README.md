## Blog: <a href="https://tech.osci.kr/2022/07/13/react-query/">React-Query 도입을 위한 고민 (feat. Recoil)</a>

<img src="https://user-images.githubusercontent.com/82820237/216752487-52cf59e8-0a5e-4640-8235-0f15abe20ba4.png" alt="blog 배너">
<p>>> 해당 글은 react-query 3.39.1 버전을 기준으로 작성된 글입니다.</p>
<p>>> 지난 7월에 포스팅 한 이후로 15000회 이상의 조회수를 기록했습니다. 많은 관심을 주셔서 감사합니다!</p>
<br/>

## Tech

- React with Typescript
- @tanstack/react-query
- Recoil
- react-hook-form (Form 에 데이터를 주입시키는 예제를 위해 설치)
- styled-components (간단한 위해 설치)

```
npm install recoil
npm install @tanstack/react-query
npm install styled-components
npm i --save-dev @types/styled-components

yarn add recoil @tanstack/react-query styled-components
yarn add @types/styled-components --dev
```

<br/>

## React Query v4 update

```
yarn remove react-query
yarn add @tanstack/react-query
yarn add @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

<br/>

## 레포지토리 변경점

### (2022-12-31 기준)

- 패키지가 react-query 에서 @tanstack/react-query 로 변경되었습니다.
- 기존의 persist 를 위한 플러그인이 실험모드 에서 안정화 모드의 플러그인으로 변경되었습니다.
  <a href="https://tanstack.com/query/v4/docs/react/plugins/createSyncStoragePersister">>플러그인 문서</a>

### (2023-02-04 기준)

- 폴더의 구조를 변경했습니다.
- 낙관적 업데이트와 무한 스크롤을 구현한 예제가 추가되었습니다.

<br/>

### (2023-02-10 기준)

- Form 관련 예제를 추가하였습니다.
- Form 은 react-hook-form 을 활용하였으며, Form 을 다룰때 react-query 를 어떻게 접근해야 할 지 담아봤습니다.

<br/>

## 사전환경설정

- 해당 앱은 간단히 JSON.server 을 띄어서 테스트 했습니다.

### JSON.server 설정방법

#-1

```
mkdir json-server && cd json-server
npm init -y
npm install json-server --save-dev
```

#-2 : vscode 에서 폴더를 열고 db.json 파일을 생성

```
// db.json
{
  "project": {
    "id": 1
  },
  "list": [
    {
      "name": "dh",
      "age": "28",
      "id": 1656479756161
    },
    ...
  ]
}
```

#-3 : 프로젝트 root 에 server.js 파일 생성

```
// server.js

const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(router);

let port = 5000;
server.listen(port, () => {
  console.log(`json server is runnging port(${port})`);
});

```

#-4 : package.json 파일의 script 수정

```
  "scripts": {
    "start": "json-server --watch db.json --port 3001"
  },
```

#-5 : 서버 실행

```
npm start
```

### db.json

- json-server 을 구동하면서 예시로 사용했던 데이터는 `db.json` 파일에 담겨있습니다!

<br/>

## What is this Repo?

- React-Query 와 Recoil 을 함께 사용하는 방법을 연습한 Repo

### 레포지토리의 구성 - 1

- FirstList 와 SecondList 컴포넌트는 같은 key를 갖은 쿼리를 바라보고 있습니다.
- 버튼을 클릭 시 데이터가 add 됩니다.
- 데이터 add 시 FirstList 는 invalidateQuries 메서드로 인해서 주어진 키값의 쿼리를 refetch 합니다.
- 쿼리를 리패치 해오기에 같은 키를 바라보고 있는 SecondList 의 list 도 업데이트 됩니다.
  <br/>

### 레포지토리의 구성 - 2

- 서버에서 가져온 데이터를 클라이언트의 전역 상태로 관리해야 할 경우
- InputData 컴포넌트에서 데이터를 입력받아서 서버에 patch 합니다.
- 데이터 patch 성공 시, useMutation 훅의 options 의 onSuccess 프로퍼티에서 프로젝트 아이디를 다시 패칭해오도록 콜백함수를 넣어줍니다.
- mutation 함수에서 isSuccess 를 리턴받아, 성공할 경우 atom 에 상태값을 저장하도록 set
- atom 에는 effect 를 통해 localStorage 와 연동해놨기 때문에, 아톰에 값이 저장된 경우에 localStorage 에 값이 저장된 걸 확인할 수 있음
  <br/>

### 레포지토리의 구성 -3

- 낙관적 업데이트 (Optimistic Update) 에 관한 연습은 component > `OptimisticUpdate.tsx` 에서 확인하실 수 있습니다.
- 컨셉을 이해해서 연습해본 예제입니다.
  <br/>

### 레포지토리의 구성 -4

- 무한 스크롤 (Infinite Scroll) 에 관한 연습은 component > `InfiniteScroll.tsx` 에서 확인하실 수 있습니다.
- 무한 스크롤을 구현하기 위하여 `useInfiniteQuery` 훅과 IntersectionObserver API 를 사용했습니다.
- 컨셉을 이해해서 연습해본 예제입니다.
- json-server 에 queryParam 을 넘기는데에 어려움이 있어 github open API 를 활용했습니다.
- 타 블로그 포스팅의 도움을 받아 작성된 예제입니다.
- <a href="https://velog.io/@wmc1415/react-query%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-infinity-scroll-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0">바로가기></a>

### 레포지토리의 구성 -5

- Form 과 react-hook-form 을 함께 활용하는 방법에 대한 예제를 작성했습니다
- `src > component > Form > EditForm.tsx` 에서 확인하실 수 있습니다.
- react-hook-form 에 관한 포스팅을 통해서 참고하시면 좋습니다.
- <a href="https://tech.osci.kr/2023/01/09/react-hook-form-series-3/">바로가기></a>
