import mongoose from "mongoose";

const storiesSchema = mongoose.Schema({
  title: { type: String },
  content: { type: String },
  author: { type: String },
  likes: { type: Number },
  comments: { type: String },
});

const Story = mongoose.model("Story", storiesSchema);

export default Story;
