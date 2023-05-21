import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "must be unique"],
  },
  phone: {
    type: String,
  },
});

const ClientModel = mongoose.model("Client", ClientSchema);
export { ClientModel };
