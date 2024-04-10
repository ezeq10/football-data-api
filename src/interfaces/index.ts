import { ObjectId } from "mongoose";
import { PlayerDocument } from "../models/player";
import { CoachDocument } from "../models/coach";

// League API interfaces
export interface LeagueData {
  competition: LeagueCompetitionData;
  teams: LeagueTeamData[];
}
export interface LeagueCompetitionData {
  name: string;
  code: string;
  areaName: string;
}
export interface LeagueTeamData {
  name: string;
  tla: string;
  shortName: string;
  area: { name: string };
  address: string;
  squad: LeaguePlayerData[] | null;
  coach: LeagueCoachData
  runningCompetitions: [] | null;
}
export interface LeagueCoachData {
  name: string;
  dateOfBirth: string;
  nationality: string;
}
export interface LeaguePlayerData extends LeagueCoachData {
  position: string;
}
export interface TransformedLeagueData {
  competition: LeagueCompetitionData;
  teams: TransformedLeagueTeamData[] | null;
}
export interface TransformedLeagueTeamData {
  name: string;
  tla: string;
  shortName: string;
  areaName: string;
  address: string;
  players: PlayerDocument[] | null;
  coach: CoachDocument | null;
  competitions: [] | null;
}

// Internal interfaces
export interface importLeagueArgs {
  leagueCode: string;
}
export interface PlayersArgs extends importLeagueArgs {
  teamName?: string;
}
export interface TeamArgs {
  name: string;
  includePlayers: boolean;
}
export interface TeamsFilterQuery {
  competitions: ObjectId;
  name?: string;
}
export interface FilterByTeamCondition {
  team: { $in: ObjectId[] };
}