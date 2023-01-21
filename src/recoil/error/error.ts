import { atom } from "recoil";
import { KEY_ERROR } from "./key";

export const errorAtom = atom({
  key: KEY_ERROR,
  default: [] as string[],
});
