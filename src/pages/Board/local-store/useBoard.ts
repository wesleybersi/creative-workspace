import { create } from "zustand";
import Store from "./types";

const useBoard = create<Store>((set) => ({
  set,
}));

export default useBoard;
