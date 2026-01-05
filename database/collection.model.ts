import {
  type Document,
  type Model,
  model,
  models,
  Schema,
  type Types,
} from "mongoose";

export interface ICollection {
  author: Types.ObjectId;
  question: Types.ObjectId;
}

export type CollectionDoc = ICollection & Document;

const CollectionSchema = new Schema<CollectionDoc>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  },
  {
    timestamps: true,
  },
);

const Collection: Model<CollectionDoc> =
  (models.Collection as Model<CollectionDoc>) ||
  model<CollectionDoc>("Collection", CollectionSchema);

export default Collection;
