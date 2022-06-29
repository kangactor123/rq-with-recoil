# Tech

- React with Typescript
- React-Query
- Recoil
- 스타일을 위한 styled-components (사실 여기엔 의미없음..)

```
npm install recoil
npm install react-query
npm install styled-components
npm i --save-dev @types/styled-components
```

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
    {
      "name": "dy",
      "age": "29",
      "id": 1656479756162
    },
    {
      "name": "bi",
      "age": "34",
      "id": 1656479756163
    },
    {
      "name": "zzz",
      "age": "222",
      "id": 1656483746312
    }
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

## What is this App?

- React-Query 와 Recoil 의 접목

## 앱의 구성 - 1

- FirstList 와 SecondList 컴포넌트는 같은 key를 갖은 쿼리를 바라보고 있습니다.
- 버튼을 클릭 시 데이터가 add 됩니다.
- 데이터 add 시 FirstList 는 invalidateQuries 메서드로 인해서 주어진 키값의 쿼리를 refetch 합니다.
- 쿼리를 리패치 해오기에 같은 키를 바라보고 있는 SecondList 의 list 도 업데이트 됩니다.

## 앱의 구성 - 2

- 서버에서 가져온 데이터를 클라이언트의 전역 상태로 관리해야 할 경우
- InputData 컴포넌트에서 데이터를 입력받아서 서버에 patch 합니다.
- 데이터 patch 성공 시, useMutation 훅의 options 의 onSuccess 프로퍼티에서 프로젝트 아이디를 다시 패칭해오도록 콜백함수를 넣어줍니다.
- mutation 함수에서 isSuccess 를 리턴받아, 성공할 경우 atom 에 상태값을 저장하도록 set
- atom 에는 effect 를 통해 localStorage 와 연동해놨기 때문에, 아톰에 값이 저장된 경우에 localStorage 에 값이 저장된 걸 확인할 수 있음
