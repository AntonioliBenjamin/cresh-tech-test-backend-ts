import { model, Schema } from "mongoose";

export type TransactionModel = {
  id: string;
  customer_id: string;
  store_name: string;
  amount: number;
  split: number;
  is_online: boolean;
  is_completed: boolean;
  created_at: number;
};

const transactionSchema = new Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
  customer_id: {
    type: String,
    required: true,
    index: true,
  },
  store_name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  split: {
    type: Number,
    required: true,
  },
  is_online: {
    type: Boolean,
    required: true,
  },        
  is_completed: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  }
});

export const transactionModel = model("transactions", transactionSchema);
