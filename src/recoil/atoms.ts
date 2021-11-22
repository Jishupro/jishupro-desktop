import { atom } from "recoil";

export const postersState = atom<string[]>({
  key: "postersState",
  default: [],
});

export const fullScreenState = atom<boolean>({
  key: "fullScreenState",
  default: false,
});
