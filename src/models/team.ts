import mongoose, { Schema, Document } from 'mongoose';

interface TeamDocument extends Document {
  name: string;
  tla: string;
  shortName: string;
  areaName: string;
  address: string;
  competitions: mongoose.Types.ObjectId[];
}

const teamSchema: Schema = new Schema({
  name: { type: String, required: true },
  tla: { type: String, required: true },
  shortName: { type: String, required: true },
  areaName: { type: String, required: true },
  address: { type: String, required: true },
  competitions: [{ type: Schema.Types.ObjectId, ref: 'Competition' }]
});

export default mongoose.model<TeamDocument>('Team', teamSchema);