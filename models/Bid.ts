import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBid extends Document {
  price: number;
  user: any;
}

const BidSchema: Schema<IBid> = new mongoose.Schema<IBid>(
  {
    price: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Bid =
  (mongoose.models.Bid as Model<IBid>) ||
  mongoose.model<IBid>("Bid", BidSchema);

export default Bid;
