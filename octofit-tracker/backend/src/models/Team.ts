import { Schema, model, Types } from 'mongoose';

interface Team {
  name: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export const TeamModel = model<Team>('Team', teamSchema);
