import { Schema } from "mongoose";
import { toJSON } from "./plugins";

const trashcansSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  document: { type: Schema.Types.Mixed, required: true },
  deletedAt: { type: Date, required: true },
  maxCount: { type: Number, default: 30 }
});

trashcansSchema.plugin(toJSON);


export default trashcansSchema;
