import axios from "axios";
import { IList } from "./type";

export async function getList() {
  const { data } = await axios.get("http://localhost:3001/list1");
  return data;
}

export const postPersonInList = (data: IList) => {
  return axios.post("http://localhost:3001/list2", {
    name: data.name,
    age: data.age,
    id: Date.now(),
  });
};

export async function getProjectId() {
  const {
    data: { id },
  } = await axios.get("http://localhost:3001/project3");
  return id;
}

export const patchProjectId = (id: number) => {
  return axios.patch("http://localhost:3001/project", { id });
};
