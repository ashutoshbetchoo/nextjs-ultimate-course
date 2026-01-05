import {
  type Document,
  type Model,
  model,
  models,
  Schema,
  type Types,
} from "mongoose";

export interface IAnswer {
  author: Types.ObjectId;
  question: Types.ObjectId;
  content: string;
  upvotes: number;
  downvotes: number;
}

export type AnswerDoc = IAnswer & Document;

const AnswerSchema = new Schema<AnswerDoc>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const Answer: Model<AnswerDoc> =
  (models.Answer as Model<AnswerDoc>) ||
  model<AnswerDoc>("Answer", AnswerSchema);

export default Answer;
