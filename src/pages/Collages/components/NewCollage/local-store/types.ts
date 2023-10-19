import { IconType } from "react-icons";
import Section, { SectionType } from "../../../../../store/data/section";
import Tile from "../../../../../store/data/tile";
import { BsGrid1X2 as IconSetup } from "react-icons/bs";
import { MdCloudUpload as IconContent } from "react-icons/md";
import { IoIosPaperPlane as IconPublish } from "react-icons/io";
import { PiSlidersHorizontalFill as IconEffects } from "react-icons/pi";

interface Store {
  collageIndex: number;
  selection: Selection | null;
  selectedType: SectionType;
  selectedTiles: Tile[];
  selectedSection: Section | null;
  expandedSection: Section | null;
  draggedSection: number | null;
  isOnBoard: boolean;
  set: (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ) => void;
}

export default Store;

export type Selection = {
  row: { start: number; end: number };
  col: { start: number; end: number };
};

export interface Stage {
  name: string;
  toolTip: string;
  icon: IconType;
}

export const stages: Stage[] = [
  {
    name: "Setup",
    toolTip: "Create, shape and resize your collage sections.",
    icon: IconSetup,
  },
  {
    name: "Add Content",
    toolTip: "Add your own content to the sections.",
    icon: IconContent,
  },
  {
    name: "Effects",
    toolTip: "Adjust colors and add additional effects.",
    icon: IconEffects,
  },
  {
    name: "Publish",
    toolTip: "Publish your new collage!",
    icon: IconPublish,
  },
];
