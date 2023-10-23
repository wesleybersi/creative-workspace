import { IconType } from "react-icons";

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
import { PiShapesFill as IconShape } from "react-icons/pi";
import { HiOutlineArrowRight as IconLine } from "react-icons/hi";
import { BsEmojiWink as IconEmoji } from "react-icons/bs";
import { RxSection as IconArea } from "react-icons/rx";
import { MdViewCarousel as IconCarousel } from "react-icons/md";
import { HiColorSwatch as IconColor } from "react-icons/hi";
export default class Section {
  id: string;
  boardId: string;
  carouselId = "";
  created: { at: number; by: string } | null = null;
  lastEdited: { at: number; by: string } | null = null;
  type: SectionType | null = null;
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
    boardId: string,
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
    const timestamp = new Date().getTime();
    const uniqueId = `${timestamp}-${Math.floor(Math.random() * 1000)}`;
    this.id = uniqueId;
    this.boardId = boardId;
    this.type = type;
    this.position = position;
    this.size = size;
    this.created = { at: Date.now(), by: "Wesley" };
  }
}

export type SectionType =
  | "Area"
  | "Color"
  | "To-do"
  | "Text"
  | "Image"
  | "Music"
  | "Video"
  | "Gallery"
  | "Profile"
  | "Empty Page"
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
  | "Comment"
  | "Shape"
  | "Arrow"
  | "Emoji"
  | "Carousel"
  | "BackgroundColor";

export interface SectionTypeData {
  name: SectionType;
  icon: IconType;
  minSize?: { rows: number; cols: number };
}

export const sectionTypes: SectionTypeData[] = [
  {
    name: "Empty Page",
    icon: IconEmpty,
  },
  // {
  //   name: "BackgroundColor",
  //   icon: IconHeading,
  // },
  {
    name: "Heading",
    icon: IconHeading,
  },
  {
    name: "Text",
    icon: IconText,
  },
  // {
  //   name: "Note",
  //   icon: IconNote,
  // },
  {
    name: "Comment",
    icon: IconComment,
    minSize: { rows: 2, cols: 2 },
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
    name: "Color",
    icon: IconColor,
  },
  {
    name: "Image",
    icon: IconImage,
  },
  // {
  //   name: "Carousel",
  //   icon: IconCarousel,
  // },
  // {
  //   name: "Music",
  //   icon: IconMusic,
  // },
  // {
  //   name: "Shape",
  //   icon: IconShape,
  // },
  // {
  //   name: "Arrow",
  //   icon: IconLine,
  // },
  // {
  //   name: "Canvas",
  //   icon: IconPencil,
  // },
  {
    name: "Video",
    icon: IconVideo,
  },
  // {
  //   name: "Emoji",
  //   icon: IconEmoji,
  // },
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
  // {
  //   name: "Indexing",
  //   icon: IconIndexing,
  // },
];
