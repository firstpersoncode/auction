import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  balance: any;
  lastBid: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    balance: {
      type: Schema.Types.ObjectId,
      ref: "Balance",
    },
    lastBid: Date,
  },
  { timestamps: true }
);

const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;
