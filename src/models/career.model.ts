import mongoose, { Schema, Document, Types } from "mongoose";

interface CareerDocument extends Document {
  skill: string;
  question: string;
  answers: string[];
}

const CareerSchema = new Schema<CareerDocument>({
  skill: { type: String, required: true },
  question: { type: String, required: true },
  answers: { type: [String], required: true },
});

const CareerModel = mongoose.model<CareerDocument>("Career", CareerSchema);

export default CareerModel;
