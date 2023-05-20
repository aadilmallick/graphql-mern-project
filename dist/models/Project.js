"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Client",
    },
});
const ProjectModel = mongoose_1.default.model("Project", ProjectSchema);
exports.ProjectModel = ProjectModel;
