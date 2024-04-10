import { FilterQuery } from 'mongoose';
import CoachModel, { CoachDocument } from '../models/coach';
import { TeamDocument } from '../models/team';

export async function getCoaches(filterCondition: FilterQuery<CoachDocument>): Promise<CoachDocument[] | null> {
  try {
    return await CoachModel.find(filterCondition);
  } catch (error) {
    console.error('Error retrieving players:', error);
    throw error;
  }
}

export async function importCoachData(team: TeamDocument, coachData: CoachDocument): Promise<void> {
  try {
    const existingCoach = await CoachModel.findOne({ name: coachData.name });
    if (!existingCoach) {
      // Coach doesn't exist, import the coach
      await CoachModel.create({
        name: coachData.name,
        dateOfBirth: coachData.dateOfBirth,
        nationality: coachData.nationality,
        team: team._id,
      });
    }
  } catch (error) {
    console.error('Error importing coach data:', error);
    throw error;
  }
}
