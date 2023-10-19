import { getColor } from "../../utils/helper-functions";
import { InventoryItem } from "../types";
import Collage from "./collage";

export default class Client {
  name: string;
  id: string;
  collages: Collage[];
  color = getColor();
  constructor(name: string) {
    this.name = name;
    this.id = "12345"; //Server generated
    this.collages = [];
  }
}
