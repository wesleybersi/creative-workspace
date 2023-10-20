import { IconType } from "react-icons";
import Collage from "./collage";
import Tile from "./tile";

import { BsImageAlt as IconImage } from "react-icons/bs";
import { ImMusic as IconMusic } from "react-icons/im";
import { BsChatLeftText as IconComment } from "react-icons/bs";
import { BsCardText as IconText } from "react-icons/bs";
import { BsCameraVideoFill as IconVideo } from "react-icons/bs";
import { BsListCheck as IconTodo } from "react-icons/bs";
import { BsListUl as IconList } from "react-icons/bs";
import { BiPoll as IconPoll } from "react-icons/bi";
import { BsCardHeading as IconHeading } from "react-icons/bs";
import { GoNote as IconNote } from "react-icons/go";
import { PiRectangleLight as IconEmpty } from "react-icons/pi";
import { ImSortNumericAsc as IconIndexing } from "react-icons/im";

export default class Section {
  id: string;
  created: { date: Date; by: string } | null = null;
  lastEdited: { date: Date; by: string } | null = null;
  collage: Collage;
  type: SectionType = "Empty";
  size: { rows: number; cols: number };
  position: {
    row: { start: number; end: number };
    col: { start: number; end: number };
  };

  color = "white";
  image: File | null = null;
  text: string[] = [];
  isValid = false;
  depth = 1;
  pages: Section[][] = [[]];
  constructor(
    collage: Collage,
    type: SectionType,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    },
    size: {
      rows: number;
      cols: number;
    }
  ) {
    this.collage = collage;
    this.type = type;
    this.position = position;
    this.size = size;
    const timestamp = new Date().getTime();
    const uniqueId = `${timestamp}-${Math.floor(Math.random() * 1000)}`;
    this.id = uniqueId;

    // let minRow = tiles[0].row;
    // let maxRow = tiles[0].row;
    // let minCol = tiles[0].col;
    // let maxCol = tiles[0].col;

    // // Find the minimum and maximum row and column values
    // for (const tile of tiles) {
    //   minRow = Math.min(minRow, tile.row);
    //   maxRow = Math.max(maxRow, tile.row);
    //   minCol = Math.min(minCol, tile.col);
    //   maxCol = Math.max(maxCol, tile.col);
    // }

    // this.size = { rows: maxRow - minRow + 1, cols: maxCol - minCol + 1 };
  }
}

export type SectionType =
  | "Color"
  | "To-do"
  | "Text"
  | "Image"
  | "Music"
  | "Video"
  | "Gallery"
  | "Profile"
  | "Empty"
  | "Note"
  | "Heading"
  | "Canvas"
  | "Embed"
  | "Poll"
  | "Story"
  | "Weather"
  | "Calendar"
  | "List"
  | "Chart"
  | "Indexing"
  | "None"
  | "Comment";

export interface SectionTypeData {
  name: SectionType;
  icon: IconType;
}

export const sectionTypes: SectionTypeData[] = [
  {
    name: "None",
    icon: IconEmpty,
  },
  {
    name: "Heading",
    icon: IconHeading,
  },
  {
    name: "Text",
    icon: IconText,
  },
  {
    name: "Note",
    icon: IconNote,
  },
  {
    name: "Comment",
    icon: IconComment,
  },
  {
    name: "List",
    icon: IconList,
  },
  {
    name: "To-do",
    icon: IconTodo,
  },
  {
    name: "Image",
    icon: IconImage,
  },
  {
    name: "Music",
    icon: IconMusic,
  },
  // {
  //   name: "Canvas",
  //   icon: IconPencil,
  // },
  {
    name: "Video",
    icon: IconVideo,
  },
  {
    name: "Poll",
    icon: IconPoll,
  },
  // {
  //   name: "Chart",
  //   icon: IconChart,
  // },

  // {
  //   name: "Profile",
  //   icon: IconFriend,
  // },
  // {
  //   name: "Weather",
  //   icon: IconWeather,
  // },
  // {
  //   name: "Calendar",
  //   icon: IconCalendar,
  // },
  {
    name: "Indexing",
    icon: IconIndexing,
  },
];
