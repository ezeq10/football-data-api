import mongoose, { Schema, Document } from 'mongoose';

interface TeamDocument extends Document {
  name: string;
  tla: string;
  shortName: string;
  areaName: string;
  address: string;
  competitions: string[];
  players: string[] | null;
  coach: string | null;
}

const teamSchema: Schema = new Schema({
  name: { type: String, required: true },
  tla: { type: String, required: true },
  shortName: { type: String, required: true },
  areaName: { type: String, required: true },
  address: { type: String, required: true },
  competitions: [{ type: Schema.Types.ObjectId, ref: 'Competition' }],
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  coach: { type: Schema.Types.ObjectId, ref: 'Coach' },
});

export default mongoose.model<TeamDocument>('Team', teamSchema);