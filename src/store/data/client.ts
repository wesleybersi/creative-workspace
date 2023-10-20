import { getColor } from "../../utils/helper-functions";
import Board from "./board";

export default class Client {
  name: string;
  id: string;
  color = getColor();
  constructor(name: string) {
    this.name = name;
    this.id = "12345"; //Server generated
  }
}
