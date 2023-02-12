import { model, Schema } from "mongoose";

export type CustomerModel = {
    id: string;
    firstname: string;
    lastname: string;
    birthdate: number;
    createdAt: number;
};

const customerSchema = new Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },

});

export const customerModel = model("customers", customerSchema);