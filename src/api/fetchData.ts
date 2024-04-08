import axios from 'axios';
import { API_URL } from '../config';

export const fetchLeagueData = async (leagueCode: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/competitions/${leagueCode}/teams`, {
      headers: {
        "X-Auth-Token": "3afb0722b9d943beb51d9a334dcc59b2"
      }
    });
    const data = response.data;

    // Transform the data as needed to match the LeagueData interface
    const transformedData: any = {
      name: data.competition.name,
      code: data.competition.code,
      areaName: data.teams[0].area.code,
      teams: data.teams.map((team: any) => ({
        name: team.name,
        tla: team.tla,
        shortName: team.shortName,
        areaName: team.area.name,
        address: team.address,
        players: team.squad?.map((player: any) => ({
          name: player.name,
          position: player.position,
          dateOfBirth: player.dateOfBirth,
          nationality: player.nationality,
        })),
        coach: {
          name: team.coach.name,
          dateOfBirth: team.coach.dateOfBirth,
          nationality: team.coach.nationality,
        },
        runningCompetitions: team.runningCompetitions?.map((runningCompetition: any) => ({
          code: runningCompetition.code
        }))
      })),
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching competition data:', error);
    throw new Error('Failed to fetch competition data.');
  }
}
