import mongoose, { Document, Model, Schema } from "mongoose";

export interface IItem extends Document {
  name: string;
  duration_start: Date;
  duration_end: Date;
  start_price: number;
  bids: any[];
  user: any;
}

const ItemSchema: Schema<IItem> = new mongoose.Schema<IItem>(
  {
    name: String,
    duration_start: Date,
    duration_end: Date,
    start_price: Number,
    bids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bid",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Item =
  (mongoose.models.Item as Model<IItem>) ||
  mongoose.model<IItem>("Item", ItemSchema);

export default Item;
