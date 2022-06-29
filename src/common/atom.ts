import { atom } from "recoil";
import { KEY_PROJECT_ID } from "./key";
import { ProjectId } from "./type";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean): void => {
      isReset
        ? localStorage.removeState(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const projectId = atom<ProjectId>({
  key: KEY_PROJECT_ID,
  effects: [localStorageEffect(KEY_PROJECT_ID)],
});
