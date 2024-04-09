import PlayerModel from '../models/player';

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
