import axios from "axios";
import { IList, IRepository } from "../utils/type";

export async function getList() {
  const { data } = await axios.get("http://localhost:3001/list");
  return data;
}

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

export async function getUserProfile() {
  const { data } = await axios.get("http://localhost:3001/profile");
  return data;
}

export async function patchUpdateLike(like: number) {
  return axios.patch("http://localhost:3001/profile1", { like });
}

export const patchProjectId = (id: number) => {
  return axios.patch("http://localhost:3001/project", { id });
};

export async function fetchRepositories(page: number) {
  return await axios
    .get<IRepository>(
      `https://api.github.com/search/repositories?q=topic:reactjs&per_page=30&page=${page}`
    )
    .then((resp) => resp.data);
}
