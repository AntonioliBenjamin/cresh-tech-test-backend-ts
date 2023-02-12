import { model, Schema } from "mongoose";

export type InstalmentModel = {
  id: string;
  transaction_id: string;
  amount: number;
  is_paid: boolean;
  planned_date: number;
  paid_date: number;
  is_last: boolean;
};

const instalmentSchema = new Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
  transaction_id: {
    type: String,
    required: true,
    index: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  is_paid: {
    type: Boolean,
    required: true,
  },
  paid_date: {
    type: Number,
    required: true,
  },
  planned_date: {
    type: Number,
    required: true,
  },
  is_last: {
    type: Boolean,
    required: true,
  },
});

export const instalmentModel = model("instalments", instalmentSchema);
