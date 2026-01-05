import {
  type Document,
  type Model,
  model,
  models,
  Schema,
  type Types,
} from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  views: number;
  upvotes: number;
  downvotes: number;
  answers: number;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type QuestionDoc = IQuestion & Document;

const QuestionSchema = new Schema<QuestionDoc>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

const Question: Model<QuestionDoc> =
  (models.Question as Model<QuestionDoc>) ||
  model<QuestionDoc>("Question", QuestionSchema);

export default Question;
