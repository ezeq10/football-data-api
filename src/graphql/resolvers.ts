import { fetchLeagueData } from '../api/fetchData';
import { validateRequest } from '../utils/requestValidator';
import CompetitionModel from '../models/competition';
import TeamModel from '../models/team';
import PlayerModel from '../models/player';
import CoachModel from '../models/coach';
import { importCompetitionData } from '../services/competition';
import { importPlayersData } from '../services/player';
import { importCoachData } from '../services/coach';
import { getTeam, importTeamData, updateCompetitions } from '../services/team';
import { ObjectId } from 'mongoose';

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
interface TeamArgs {
  name: string;
  includePlayers: boolean;
}

// Define a type for the team document with players property
type TeamWithPlayers = Document & {
  players?: any[];
};

export const resolvers = {
  Mutation: {
    importLeague: async (_, { leagueCode }:importLeagueArgs) => {
      try {
        // Validate request limit before calling fetchData
        await validateRequest();

        // Fetch league data from the external API
        const leagueData = await fetchLeagueData(leagueCode);

        // Import competition
        const competitionId = await importCompetitionData(leagueData);
        
        // Import teams and players
        for (const teamData of leagueData.teams) {
          const existingTeam = await getTeam(teamData.tla);
          if (!existingTeam) {
            // import new team 
            const newTeam = await importTeamData(teamData, competitionId);
            // Import coach/players data for the new team
            (teamData?.players?.length === 0) 
              ? await importCoachData(newTeam, teamData.coach)
              : await importPlayersData(newTeam, teamData.players);

          } else {
            // Team exists, import new coach/players if they don't already exist
            (teamData?.players?.length === 0) 
              ? await importCoachData(existingTeam, teamData.coach)
              : await importPlayersData(existingTeam, teamData.players);

            // Update competitions array 
            // (not required, but probably useful unless an override flag is used to perform a complete update)
            await updateCompetitions(existingTeam._id, competitionId);
          }
        }

        return true; // Indicate successful import
        
      } catch (error) {
        console.error('Error importing league:', error);
        throw new Error(`Failed to import league. ${error}. Please try again later.`);
      }
    },
  },
  Query: {
    players: async (_, { leagueCode, teamName }: PlayersArgs): Promise<any[]> => {
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
        const filterByTeamCondition: any = { team: { $in: teams.map(team => team._id) } };

        // Find players belonging to the teams participating in the competition
        const players = await PlayerModel.find(filterByTeamCondition);
        if (players.length === 0) {
          return await CoachModel.find(filterByTeamCondition);
        }
        
        return players;

      } catch (error) {
        console.error('Error retrieving players:', error.message);
        throw error;
      }
    },
    team: async (_, { name, includePlayers }: TeamArgs): Promise<any> => {
      try {
        // Find team based on name
        const team = await TeamModel.findOne({ name });

        if (!team) {
          throw new Error('Team not found');
        }

        if (includePlayers) {
          // If includePlayers is true, fetch players associated with the team
          const players = await PlayerModel.find({ team: team._id });
          // Merge players with team document
          const teamWithPlayers: TeamWithPlayers = { ...team.toObject(), players };
          return teamWithPlayers;
        }

        return team;
      
      } catch (error) {
        console.error('Error finding team:', error);
        throw new Error('Failed to retrieve team. Please try again later.');
      }
    }
  }  
};