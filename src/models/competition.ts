import mongoose, { Schema, Document } from 'mongoose';

interface CompetitionDocument extends Document {
  name: string;
  code: string;
  areaName: string;
  teams: mongoose.Types.ObjectId[];
}

const competitionSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  areaName: { type: String, required: true },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
});

export default mongoose.model<CompetitionDocument>('Competition', competitionSchema);