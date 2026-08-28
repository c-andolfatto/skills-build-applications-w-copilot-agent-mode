import { InferSchemaType, model, models, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    fitnessLevel: { type: String, required: true, trim: true },
    goal: { type: String, required: true, trim: true },
    favoriteActivity: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User = models.User || model('User', userSchema);

export default User;
