import Bed from "../bed";
import { CropType } from "./all-crops";

export default class Crop {
  name: string;
  thumb = "";
  bed: Bed;
  growthDuration: number; // In miliseconds
  currentStep: number;
  planted = { by: "Farmer", at: new Date().getTime() };
  progress = 0;
  isInfested = false;
  isReadyToHarvest = false;
  constructor(bed: Bed, crop: CropType) {
    this.name = crop.name;
    if (crop.thumb) this.thumb = crop.thumb;
    this.bed = bed;
    this.currentStep = 1;
    this.growthDuration = crop.growthDuration;
  }
  getGrowthProgress() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - this.planted.at;
    const progress = Math.min((elapsedTime / this.growthDuration) * 100, 100);
    if (progress >= 100) this.isReadyToHarvest = true;
    this.progress = progress;
    return progress;
  }
}
