import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionInput {
  user: UserDocument["_id"];
  userAgent: string;
  valid: boolean;
}
export interface SessionDocument extends SessionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    userAgent: { type: String },
    valid: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);
export default SessionModel;
