import axios from "axios";
import { IList } from "./type";

// export const getList = async () => {
//   const list = await axios.get("http://localhost:3001/list");
// };

export async function getList() {
  const { data } = await axios.get("http://localhost:3001/list");
  console.log("api.list", data);
  return data;
}

// export function putPersonInList(data: IList) {
//   return axios.put("http://localhost:3001/list", data);
// }

export const postPersonInList = (data: IList) => {
  return axios.post("http://localhost:3001/list", {
    name: data.name,
    age: data.age,
    id: Date.now(),
  });
};

export async function getProjectId() {
  const {
    data: { id },
  } = await axios.get("http://localhost:3001/project");
  return id;
}

export const patchProjectId = (id: number) => {
  return axios.patch("http://localhost:3001/project", { id });
};
