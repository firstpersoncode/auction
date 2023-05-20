import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBalance extends Document {
  balance: number;
}

const BalanceSchema: Schema<IBalance> = new mongoose.Schema<IBalance>(
  {
    balance: Number,
  },
  { timestamps: true }
);

const Balance =
  (mongoose.models.Balance as Model<IBalance>) ||
  mongoose.model<IBalance>("Balance", BalanceSchema);

export default Balance;
