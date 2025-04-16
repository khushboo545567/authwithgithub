import mongoose from "mongoose";
import { nanoid } from "nanoid";

const startupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  views: { type: Number, default: 0 },
  description: { type: String },
  category: {
    type: String,
    required: [true, "Please enter a category"],
    minlength: [3, "Category must be at least 1 character long"],
    maxlength: [20, "Category must not exceed 20 characters"],
  },
  image: { type: String, required: true },
  pitch: {
    type: String,
    required: [true, "Please enter a pitch"],
    minlength: [10, "Pitch must be at least 10 characters long"],
  },
});

// auto generate slug before saving
startupSchema.pre("save", async function (next) {
  if (!this.slug) {
    let newSlug = this.title.toLowerCase().replace(/ /g, "-");

    // Ensure slug is unique
    let existing = await mongoose.models.Startup.findOne({ slug: newSlug });
    if (existing) {
      newSlug += "-" + nanoid(6); // Add random characters to avoid duplication
    }

    this.slug = newSlug;
  }
  next();
});

const Startup =
  mongoose.models.Startup || mongoose.model("Startup", startupSchema);

export default Startup;
