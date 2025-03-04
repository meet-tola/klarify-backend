import mongoose, { Schema, Document } from "mongoose";

interface CareerQuestion {
  _id: any;
  question: string;
  answers: string[];
}

interface CareerDocument extends Document {
  skill: string;
  questions: CareerQuestion[];
}

const CareerSchema = new Schema<CareerDocument>({
  skill: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      answers: { type: [String], required: true },
    },
  ],
});

const CareerModel = mongoose.model<CareerDocument>("Career", CareerSchema);

export default CareerModel;
