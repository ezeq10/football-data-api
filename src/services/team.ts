import TeamModel, { TeamDocument } from '../models/team';
import { TeamData } from '../types';

export async function getTeam(tla: string): Promise<TeamDocument | null>  {
  try {
    return await TeamModel.findOne({ tla: tla });
  } catch (error) {
    console.error('Error retrieving team:', error);
    throw error;
  }
}

export async function importTeamData(teamData: TeamData, competitionId: string): Promise<TeamDocument> {
  try {
    const newTeam = await TeamModel.create({
      name: teamData.name,
      tla: teamData.tla,
      shortName: teamData.shortName,
      areaName: teamData.areaName,
      address: teamData.address,
      competitions: [competitionId]
    });

    return newTeam;

  } catch (error) {
    console.error('Error importing team data:', error);
    throw error;
  }
}