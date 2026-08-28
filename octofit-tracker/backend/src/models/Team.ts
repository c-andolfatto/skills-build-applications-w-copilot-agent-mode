import { InferSchemaType, model, models, Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    challenge: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = models.Team || model('Team', teamSchema);

export default Team;
