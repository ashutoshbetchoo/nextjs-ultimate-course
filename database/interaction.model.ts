import {
  type Document,
  type Model,
  model,
  models,
  Schema,
  type Types,
} from "mongoose";

export interface IInteraction {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "question" | "answer";
}

export type InteractionDoc = IInteraction & Document;

const InteractionSchema = new Schema<InteractionDoc>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: { type: String, enum: ["question", "answer"], required: true },
  },
  {
    timestamps: true,
  },
);

const Interaction: Model<InteractionDoc> =
  (models.Interaction as Model<InteractionDoc>) ||
  model<InteractionDoc>("Interaction", InteractionSchema);

export default Interaction;
