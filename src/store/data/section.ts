import { IconType } from "react-icons";
import { getColor } from "../../utils/helper-functions";
import Collage from "./collage";
import Tile from "./tile";

import { BsImageAlt as IconImage } from "react-icons/bs";
import { RiDoubleQuotesR as IconQuote } from "react-icons/ri";
import { AiTwotonePieChart as IconChart } from "react-icons/ai";
import { BiSolidColorFill as IconColor } from "react-icons/bi";
import { ImMusic as IconMusic } from "react-icons/im";
import { BsChatLeftText as IconStory } from "react-icons/bs";
import { MdOutlineTitle as IconText } from "react-icons/md";
import { BsCameraVideoFill as IconVideo } from "react-icons/bs";
import { IoMdImages as IconGallery } from "react-icons/io";
import { IoMdClose as IconEmpty } from "react-icons/io";
// import { PiTextTBold as IconText } from "react-icons/pi";
import { BsEmojiWink as IconEmoji } from "react-icons/bs";
import { MdTitle as IconHeader } from "react-icons/md";
import { FaShapes as IconShape } from "react-icons/fa";
// import { PiPencilDuotone as IconPencil } from "react-icons/pi";
import { MdDraw as IconPencil } from "react-icons/md";
import { BsListCheck as IconTodo } from "react-icons/bs";
import { BiPoll as IconPoll } from "react-icons/bi";
import { FaUserFriends as IconFriend } from "react-icons/fa";
import { BsCardHeading as IconHeading } from "react-icons/bs";
import { PiCloudSun as IconWeather } from "react-icons/pi";
import { BsCalendarEvent as IconCalendar } from "react-icons/bs";
import { GoNote as IconNote } from "react-icons/go";

export default class Section {
  collage: Collage;
  title = "";
  description: string[] = [];
  type: SectionType = "Empty";
  tiles: Tile[];
  size: { rows: number; cols: number };
  position: {
    row: { start: number; end: number };
    col: { start: number; end: number };
  };
  color = "white";
  image: File | null = null;
  text: string[] = [];
  isValid = false;
  constructor(
    collage: Collage,
    tiles: Tile[],
    type: SectionType,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    }
  ) {
    this.collage = collage;
    this.type = type;
    this.tiles = tiles;
    this.position = position;

    let minRow = tiles[0].row;
    let maxRow = tiles[0].row;
    let minCol = tiles[0].col;
    let maxCol = tiles[0].col;

    // Find the minimum and maximum row and column values
    for (const tile of tiles) {
      minRow = Math.min(minRow, tile.row);
      maxRow = Math.max(maxRow, tile.row);
      minCol = Math.min(minCol, tile.col);
      maxCol = Math.max(maxCol, tile.col);
    }

    this.size = { rows: maxRow - minRow + 1, cols: maxCol - minCol + 1 };
  }
  randomNoteColor() {
    const noteColors = ["#D9F0FF", "#CDF1CC", "#FFE9D9", "#F6F5BC"];
    this.color = noteColors[Math.floor(Math.random() * noteColors.length)];
    // this.color = getColor();
  }
}

export type SectionType =
  | "Color"
  | "To-do"
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
  | "Chart";

export interface SectionTypeData {
  name: SectionType;
  icon: IconType;
}

export const sectionTypes: SectionTypeData[] = [
  {
    name: "Heading",
    icon: IconHeading,
  },
  {
    name: "Note",
    icon: IconNote,
  },
  {
    name: "Story",
    icon: IconStory,
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
  {
    name: "Canvas",
    icon: IconPencil,
  },
  {
    name: "Video",
    icon: IconVideo,
  },
  {
    name: "Poll",
    icon: IconPoll,
  },
  {
    name: "Chart",
    icon: IconChart,
  },

  {
    name: "Profile",
    icon: IconFriend,
  },
  {
    name: "Weather",
    icon: IconWeather,
  },
  {
    name: "Calendar",
    icon: IconCalendar,
  },
];
