import { ObjectId } from "mongoose";

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