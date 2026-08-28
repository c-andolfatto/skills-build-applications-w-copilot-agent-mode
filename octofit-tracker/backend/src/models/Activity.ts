import { Schema, model, Types } from 'mongoose';

interface Activity {
  userId: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  occurredAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    occurredAt: { type: Date, required: true }
  },
  { timestamps: true }
);

export const ActivityModel = model<Activity>('Activity', activitySchema);
