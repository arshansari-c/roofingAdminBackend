import mongoose, { Schema } from "mongoose";

const userPdfSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref : "User",
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const UserPdf = mongoose.model("UserPdf", userPdfSchema);
