import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/* ---------------- Conversation (chat transcripts) ---------------- */

const messageSchema = new Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false },
);

const conversationSchema = new Schema(
  {
    title: { type: String, required: true },
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true },
);

export type ConversationMessage = InferSchemaType<typeof messageSchema>;
export type Conversation = InferSchemaType<typeof conversationSchema>;

export const ConversationModel: Model<Conversation> =
  (mongoose.models.Conversation as Model<Conversation>) ||
  mongoose.model<Conversation>("Conversation", conversationSchema);

/* ---------------- Enrolment (website enrolment form) ---------------- */

const enrolmentSchema = new Schema(
  {
    course: { type: String, required: true },
    level: { type: String, default: "" },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    studentName: { type: String, default: "" },
    studentAge: { type: String, default: "" },
    isChild: { type: Boolean, default: false },
    preferredTime: { type: String, default: "" },
    teacherPreference: {
      type: String,
      enum: ["either", "male", "female"],
      default: "either",
    },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "enrolled", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);

export type Enrolment = InferSchemaType<typeof enrolmentSchema>;

export const EnrolmentModel: Model<Enrolment> =
  (mongoose.models.Enrolment as Model<Enrolment>) ||
  mongoose.model<Enrolment>("Enrolment", enrolmentSchema);
