import { fetchLeagueData } from '../api/fetchData';
import CompetitionModel from '../models/competition';
import TeamModel from '../models/team';
import PlayerModel from '../models/player';
import CoachModel from '../models/coach';


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

interface importLeagueArgs {
  leagueCode: string;
}
interface PlayersArgs extends importLeagueArgs {
  teamName?: string;
}

export const resolvers = {
  Mutation: {
    importLeague: async (_: any, { leagueCode }:importLeagueArgs) => {
      try {
        // Fetch league data from the external API
        const leagueData = await fetchLeagueData(leagueCode);

        // Import competition
        const existingCompetition = await CompetitionModel.findOne({ code: leagueData.competition.code });
        let competitionId;

        if (!existingCompetition) {
          // Competition doesn't exist, import the competition
          const newCompetition = await CompetitionModel.create({
            name: leagueData.competition.name,
            code: leagueData.competition.code,
            areaName: leagueData.competition.areaName
          });
          competitionId = newCompetition._id;
        } else {
          competitionId = existingCompetition._id;
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
              competitions: [competitionId]
            });

            // Import coach/players data for the new team
            (teamData.players.length === 0) 
              ? await importCoachData(newTeam, teamData.coach)
              : await importPlayersData(newTeam, teamData.players);

          } else {
            // Team exists, import new coach/players if they don't already exist
            (teamData.players.length === 0) 
              ? await importCoachData(existingTeam, teamData.coach)
              : await importPlayersData(existingTeam, teamData.players);

            // Update competitions array
            const competitionsToUpdate = existingTeam.competitions.concat(teamData.competitions);
            await TeamModel.findOneAndUpdate(
              { _id: existingTeam._id },
              { $set: { competitions: competitionsToUpdate } }
            );
          }
        }

        return true; // Indicate successful import
        
      } catch (error) {
        console.error('Error importing league:', error);
        throw new Error('Failed to import league. Please try again later.');
      }
    },
  },
  Query: {
    players: async (_: any, { leagueCode, teamName }: PlayersArgs): Promise<any[]> => {
      try {
        // Find competition by leagueCode
        const competition = await CompetitionModel.findOne({ code: leagueCode });
        if (!competition) {
          throw new Error(`Competition with league code "${leagueCode}" not found.`);
        }

        // Construct query to find teams participating in the competition
        const teamsQuery: any = { competitions: competition._id };

        // If teamName is provided, add name filter to team query
        if (teamName) {
          teamsQuery.name = teamName;
        }
        
        // Find teams participating in the competition
        const teams = await TeamModel.find(teamsQuery);
        // If no teams found, return empty array
        if (teams.length === 0) {
          return [];
        }

        // Construct query to find players belonging to the teams participating in the competition
        const playersQuery: any = { team: { $in: teams.map(team => team._id) } };

        // Find players belonging to the teams participating in the competition
        const players = await PlayerModel.find(playersQuery);

        return players;

      } catch (error) {
        console.error('Error retrieving players:', error.message);
        throw error;
      }
    },
    team: async (_: any, { name }:{ name: string }) => {
      try {
        // Find players based on name
        const team = await TeamModel.findOne({ name });
        return team;
      } catch (error) {
        console.error('Error finding team:', error);
        throw new Error('Failed to retrieve team. Please try again later.');
      }
    }
  }  
};

async function importPlayersData(team: any, playersData: any[]) {
  for (const playerData of playersData) {
    const existingPlayer = await PlayerModel.findOne({ name: playerData.name });
    if (!existingPlayer) {
      // Player doesn't exist, import the player
      await PlayerModel.create({
        name: playerData.name,
        position: playerData.position,
        dateOfBirth: playerData.dateOfBirth,
        nationality: playerData.nationality,
        team: team._id, // Assign the player to the team
      });
    }
  }
}

async function importCoachData(team: any, coachData: any) {
  const existingCoach = await CoachModel.findOne({ name: coachData.name });
  if (!existingCoach) {
    // Coach doesn't exist, import the coach
    await PlayerModel.create({
      name: coachData.name,
      dateOfBirth: coachData.dateOfBirth,
      nationality: coachData.nationality,
      team: team._id, // Assign the coach to the team
    });
  }
}