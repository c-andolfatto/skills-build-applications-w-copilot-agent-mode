import { Schema, model } from 'mongoose';

interface Workout {
  title: string;
  targetLevel: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    targetLevel: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    durationMinutes: { type: Number, required: true, min: 1 }
  },
  { timestamps: true }
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);
