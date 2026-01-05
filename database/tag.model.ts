import { type Document, type Model, model, models, Schema } from "mongoose";

export interface ITag {
  name: string;
  questions: number;
}

export type TagDoc = ITag & Document;

const TagSchema = new Schema<TagDoc>(
  {
    name: { type: String, required: true, unique: true },
    questions: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const Tag: Model<TagDoc> =
  (models.Tag as Model<TagDoc>) || model<TagDoc>("Tag", TagSchema);

export default Tag;
