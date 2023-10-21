import Section, { SectionType } from "../../../store/data/section";
import Tile from "../../../store/data/tile";

interface Store {
  set: (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ) => void;
}

export default Store;
