import { Schema, model } from "mongoose";

const TreatmentSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    imagepublic_id: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model("Treatment", TreatmentSchema);
