import mongoose, { Schema, Document } from 'mongoose';

export interface CoachDocument extends Document {
  name: string;
  dateOfBirth: Date | null;
  nationality: string;
}

const coachSchema: Schema = new Schema({
  name: { type: String },
  dateOfBirth: { type: Date },
  nationality: { type: String }
});

export default mongoose.model<CoachDocument>('Coach', coachSchema);