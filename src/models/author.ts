// import mongoose from "mongoose";

// const authorSchema = new mongoose.Schema({
//   name: { type: String },
//   email: { type: String, unique: true, sparse: true },
//   image: { type: String },
//   // bio: { type: String },
// });

// const Author = mongoose.models.Author || mongoose.model("Author", authorSchema);
// export default Author;

import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
});

const Author = mongoose.models.Author || mongoose.model("Author", authorSchema);

export default Author;
