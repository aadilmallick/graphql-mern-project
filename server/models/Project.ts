import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In progress", "Completed"],
  },
  clientId: {
    // id that refers to the model with name of "Client"
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);
export { ProjectModel };
