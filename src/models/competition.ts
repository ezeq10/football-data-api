import mongoose, { Schema, Document } from 'mongoose';

interface CompetitionDocument extends Document {
  name: string;
  code: string;
  areaName: string;
}

const competitionSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  areaName: { type: String, required: true },
});

export default mongoose.model<CompetitionDocument>('Competition', competitionSchema);