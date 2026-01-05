import {
  type Document,
  type Model,
  model,
  models,
  Schema,
  type Types,
} from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  password?: string;
  provider: string;
  providerAccountId: string;
}

export type AccountDoc = IAccount & Document;

const AccountSchema = new Schema<AccountDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Account: Model<AccountDoc> =
  (models.Account as Model<AccountDoc>) ||
  model<AccountDoc>("Account", AccountSchema);

export default Account;
