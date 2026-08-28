import { InferSchemaType, model, models, Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    streakDays: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export type LeaderboardEntryDocument = InferSchemaType<typeof leaderboardEntrySchema>;

const LeaderboardEntry = models.LeaderboardEntry || model('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
