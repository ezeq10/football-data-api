import { FilterQuery } from 'mongoose';
import PlayerModel, { PlayerDocument } from '../models/player';

export async function getPlayers(filterCondition: FilterQuery<PlayerDocument>): Promise<PlayerDocument[] | null> {
  try {
    return await PlayerModel.find(filterCondition);
  } catch (error) {
    console.error('Error retrieving players:', error);
    throw error;
  }
}

export async function getPlayersByTeam(teamId: string): Promise<PlayerDocument[] | null> {
  try {
    return await PlayerModel.find({ team: teamId });
  } catch (error) {
    console.error('Error retrieving players:', error);
    throw error;
  }
}

export async function importPlayersData(team: any, playersData: any[]): Promise<void> {
  try {
    for (const playerData of playersData) {
      const existingPlayer = await PlayerModel.findOne({ name: playerData.name });
      if (!existingPlayer) {
        // Player doesn't exist, import the player
        await PlayerModel.create({
          name: playerData.name,
          position: playerData.position,
          dateOfBirth: playerData.dateOfBirth,
          nationality: playerData.nationality,
          team: team._id,
        });
      }
    }
  } catch (error) {
    console.error('Error importing player data:', error);
    throw error;
  }
}
