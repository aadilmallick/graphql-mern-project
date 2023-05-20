"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ClientSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});
const ClientModel = mongoose_1.default.model("Client", ClientSchema);
exports.ClientModel = ClientModel;
