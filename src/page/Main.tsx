import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { projectId } from "src/recoil/project";
import { KEY_PROJECT } from "src/utils/queryKey";
import { FirstList, InputData, SecondList } from "src/component";
import { getProjectId } from "src/api";
import {
  FIRST_PAGE_PATH,
  OPTIMISTIC_UPDATE_PAGE_PATH,
  SECOND_PAGE_PATH,
} from "src/utils/routePath";

const routerPath = [
  {
    path: "/",
    label: "goMain",
  },
  {
    path: FIRST_PAGE_PATH,
    label: "First Page",
  },
  {
    path: SECOND_PAGE_PATH,
    label: "Second Page",
  },
  {
    path: OPTIMISTIC_UPDATE_PAGE_PATH,
    label: "optimistic update page",
  },
];

function Main() {
  const setProjectId = useSetRecoilState(projectId);
  // const { data } = useQuery(KEY_PROJECT, getProjectId, {
  //   onSuccess: (data) => {
  //     setProjectId(data);
  //   },
  // });

  return (
    <div>
      {/* <h1>ProjectId is {data ?? "null"}</h1> */}
      <FirstList />
      <SecondList />
      <InputData />
      <div>
        {routerPath.map(({ path, label }) => (
          <div>
            <Link key={path} to={path}>
              {label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
