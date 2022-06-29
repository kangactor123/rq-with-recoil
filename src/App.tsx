import React from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { getProjectId } from "./common/api";
import { projectId } from "./common/atom";
import { KEY_PROJECT_ID } from "./common/key";
import FirstList from "./component/FirstList";
import InputData from "./component/InputData";
import SecondList from "./component/SecondList";

function App() {
  const { data } = useQuery(KEY_PROJECT_ID, getProjectId);
  const setProjectId = useSetRecoilState(projectId);

  if (data) {
    setProjectId(data);
  }

  return (
    <>
      <h1>ProjectId is {data ?? "null"}</h1>
      <FirstList />
      <SecondList />
      <InputData />
    </>
  );
}

export default App;
