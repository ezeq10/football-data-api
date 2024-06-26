import CompetitionModel, { CompetitionDocument } from '../models/competition';

export async function getCompetition(leagueCode: string): Promise<CompetitionDocument | null>  {
  try {
    return await CompetitionModel.findOne({ code: leagueCode });
  } catch (error) {
    console.error('Error retrieving competition:', error);
    throw error;
  }
}

export async function importCompetitionData(leagueData: any): Promise<string> {
  try {
    const existingCompetition = await CompetitionModel.findOne({ code: leagueData.competition.code });
    let competitionId;

    if (!existingCompetition) {
      // Competition doesn't exist, import the competition
      const newCompetition = await CompetitionModel.create({
        name: leagueData.competition.name,
        code: leagueData.competition.code,
        areaName: leagueData.competition.areaName
      });
      competitionId = newCompetition._id.toString();
    } else {
      competitionId = existingCompetition._id.toString();
    }

    return competitionId;

  } catch (error) {
    console.error('Error importing coach data:', error);
    throw error;
  }
}
