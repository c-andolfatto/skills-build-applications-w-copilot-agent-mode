import { Schema, model, Types } from 'mongoose';

interface LeaderboardEntry {
  userId: Types.ObjectId;
  points: number;
  rank: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
  },
  { timestamps: true }
);

export const LeaderboardEntryModel = model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardEntrySchema
);
