const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  url: {
    type: String,
  },
  comment: {
    type: String,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
