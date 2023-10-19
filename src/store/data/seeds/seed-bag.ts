import Crop from "../crops/crop";
import { CropType } from "../crops/all-crops";

export default class SeedBag {
  type: CropType;
  amount: number;
  constructor(type: CropType, amount: number) {
    this.type = type;
    this.amount = amount;
  }
}
