import { v4 as uuid } from "uuid";

export const range = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

export const generateSession = (id:number) =>
  `${Date.now()}-${uuid()}-${uuid()}-${uuid()}-${Date.now()}-${uuid()}-${uuid()}-${uuid()}-${Date.now()}-${id}-${String(range(0, 999999999)).padStart(9, "0")}`;
