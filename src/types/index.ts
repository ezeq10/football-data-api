import { ObjectId } from "mongoose";

export type TeamData = {
  name: string;
  tla: string;
  shortName: string;
  areaName: string;
  address: string;
  competitions: ObjectId[];
}