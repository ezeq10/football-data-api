import axios from 'axios';
import moment from 'moment';
import { 
  API_URL, 
  API_TOKEN 
} from '../config';
import { 
  LeagueCompetitionData,
  LeaguePlayerData, 
  LeagueTeamData,
  TransformedLeagueData
} from '../interfaces';

export const fetchLeagueData = async (leagueCode: string): Promise<TransformedLeagueData> => {
  try {
    const response = await axios.get(`${API_URL}/competitions/${leagueCode}/teams`, {
      headers: {
        "X-Auth-Token": API_TOKEN
      }
    });
    const data = response.data;

    // Transform the data as needed to match the LeagueData interface
    const TransformedLeagueData: TransformedLeagueData = {
      competition: {
        name: data.competition.name,
        code: data.competition.code,
        areaName: data.teams[0].area.code,
      },
      teams: data.teams.map((team: LeagueTeamData) => ({
        name: team.name,
        tla: team.tla,
        shortName: team.shortName,
        areaName: team.area.name,
        address: team.address,
        players: team.squad?.map((player: LeaguePlayerData) => ({
          name: player.name,
          position: player.position,
          dateOfBirth: moment(player.dateOfBirth).isValid() ? player.dateOfBirth : null,
          nationality: player.nationality,
        })),
        coach: {
          name: team.coach.name,
          dateOfBirth: team.coach.dateOfBirth,
          nationality: team.coach.nationality,
        },
        runningCompetitions: team.runningCompetitions?.map((runningCompetition: LeagueCompetitionData) => ({
          code: runningCompetition.code
        }))
      })),
    };
    
    return TransformedLeagueData;
  } catch (error) {
    console.error('Error fetching competition data:', error);
    throw new Error('Failed to fetch competition data.');
  }
}
