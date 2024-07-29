const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  image: { data: Buffer, contentType: String },
  likes: { type: Number },
  createdBy: { type: String },
  user: { type: Object }
});

const Forum = mongoose.model("Forum", forumSchema);
module.exports = Forum;
