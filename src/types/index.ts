import { ObjectId } from "mongoose";
import { PlayerDocument } from "../models/player";
import { CoachDocument } from "../models/coach";

export type TeamData = {
  name: string;
  tla: string;
  shortName: string;
  areaName: string;
  address: string;
  competitions: ObjectId[];
}

export type PlayerOrCoachArrayOrNull = PlayerDocument[] | CoachDocument[] | null;
