export interface CropType {
  name: string;
  growthDuration: number;
  thumb?: string;
}

function days(amount: number) {
  return amount * (24 * 60 * 60 * 1000);
}
function hours(amount: number) {
  return amount * (60 * 60 * 1000);
}
function minutes(amount: number) {
  return amount * (60 * 1000);
}
function seconds(amount: number) {
  return amount * 60;
}

const crops: CropType[] = [
  { name: "Carrot", growthDuration: days(1) },
  {
    name: "Potato",
    growthDuration: days(1) + hours(5) + minutes(30),
  },
  { name: "Tomato", growthDuration: hours(8) },
  { name: "Lettuce", growthDuration: hours(4) },
  { name: "Corn", growthDuration: days(2) + hours(3) },
  { name: "Lettuce", thumb: "🥬", growthDuration: minutes(1) },
  { name: "Magic Bean", thumb: "🥬", growthDuration: minutes(5) },
];

export function returnCropByName(name: string) {
  const matchingCrop = crops.find((crop) => crop.name === name);
  if (matchingCrop) return matchingCrop;
  return crops[0];
}

export default crops;
