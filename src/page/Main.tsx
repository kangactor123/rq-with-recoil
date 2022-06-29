import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getProjectId } from "../common/api";
import { projectId } from "../common/atom";
import { KEY_PROJECT_ID } from "../common/key";
import FirstList from "../component/FirstList";
import InputData from "../component/InputData";
import SecondList from "../component/SecondList";
import { FIRST_PAGE_PATH, SECOND_PAGE_PATH } from "../Router";

function Main() {
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
      <div>
        <Link to="/">goMain</Link>
        <br />
        <Link to={FIRST_PAGE_PATH}>first page</Link>
        <br />
        <Link to={SECOND_PAGE_PATH}>second page</Link>
        <br />
      </div>
    </>
  );
}

export default Main;
