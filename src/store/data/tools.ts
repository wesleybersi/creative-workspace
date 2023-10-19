export interface Tool {
  name: string;
  toolTip: string;
  unlocks?: ToolUnlock[];
}

export interface ToolUnlock {
  name: string;
  specs: { [key: string]: string | number };
  directions?: boolean;
  description?: string[];
}

export const tools: Tool[] = [
  {
    name: "Edit",
    toolTip: "Edit your grid",
  },
  {
    name: "Preview",
    toolTip: "Preview your grid",
  },
  {
    name: "Explore",
    toolTip: "Explore other people's grid",
  },
];
