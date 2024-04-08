import { fetchLeagueData } from '../api/fetchData';
import TeamModel from '../models/team';
import PlayerModel from '../models/player';
import CompetitionModel from '../models/competition';

// interface CompetitionsData {
//   name: string;
//   code: string;
//   areaName: string;
//   teams: TeamData[];
// }

// interface TeamData {
//   name: string;
//   tla: string;
//   shortName: string;
//   areaName: string;
//   address: string;
//   players: PlayerData[] | null;
//   coach: CoachData
//   runningCompetitions: [] | null;
// }

// interface CoachData {
//   name: string;
//   dateOfBirth: string;
//   nationality: string;
// }

// interface PlayerData extends CoachData {
//   position: string;
// }

export const resolvers = {
  Mutation: {
    importLeague: async (_: any, { leagueCode }:{ leagueCode: string }) => {
      try {
        // Fetch league data from the external API
        const leagueData = await fetchLeagueData(leagueCode);
        console.log('leagueData',leagueData);
        
        /*
        // Import competitions teams
        for (const competitionData of leagueData.competitions) {
          const existingCompetition = await CompetitionModel.findOne({ code: competitionData.code });

          if (!existingCompetition) {
            // Competition doesn't exist, import the competition
            await CompetitionModel.create({
              name: competitionData.name,
              code: competitionData.code,
              areaName: competitionData.areaName,
            });
          }
        }

        // Import teams and players
        for (const teamData of leagueData.teams) {
          const existingTeam = await TeamModel.findOne({ tla: teamData.tla });

          if (!existingTeam) {
            // Team doesn't exist, import the team along with its players
            const newTeam = await TeamModel.create({
              name: teamData.name,
              tla: teamData.tla,
              shortName: teamData.shortName,
              areaName: teamData.areaName,
              address: teamData.address,
            });

            // Import players data for the new team
            await importPlayersData(newTeam, teamData.players);
          } else {
            // Team exists, import new players if they don't already exist
            await importPlayersData(existingTeam, teamData.players);
          }
        }*/

        return true; // Indicate successful import
      } catch (error) {
        console.error('Error importing league:', error);
        throw new Error('Failed to import league. Please try again later.');
      }
    },
  }
};

// async function importPlayersData(team: any, playersData: any[]) {
//   for (const playerData of playersData) {
//     // Check if player exists in MongoDB
//     const existingPlayer = await PlayerModel.findOne({ name: playerData.name });

//     if (!existingPlayer) {
//       // Player doesn't exist, import the player
//       await PlayerModel.create({
//         name: playerData.name,
//         position: playerData.position,
//         dateOfBirth: playerData.dateOfBirth,
//         nationality: playerData.nationality,
//         team: team._id, // Assign the player to the team
//       });
//     }
//   }
// }
