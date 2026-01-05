import {
  type Document,
  type Model,
  model,
  models,
  Schema,
  type Types,
} from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

export type VoteDoc = IVote & Document;

const VoteSchema = new Schema<VoteDoc>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    id: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ["question", "answer"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  {
    timestamps: true,
  },
);

const Vote: Model<VoteDoc> =
  (models.Vote as Model<VoteDoc>) || model<VoteDoc>("Vote", VoteSchema);

export default Vote;
