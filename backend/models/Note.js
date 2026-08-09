import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    ticket: { type: Number }
  },
  { timestamps: true }
);

noteSchema.pre('save', async function() {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: 'ticketNums' },
      { $inc: { seq: 1 } },
      { returnDocument: 'after', upsert: true }
    );
    this.ticket = counter.seq + 499;
  }
});

const Note = mongoose.model('Note', noteSchema);

export default Note;