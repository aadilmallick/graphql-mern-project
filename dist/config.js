"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        mongoose_1.default.set("strictQuery", true);
        if (!process.env.MONGO_URI)
            throw Error("undefined connection string");
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("connected");
    }
    catch (e) {
        console.log(e);
    }
};
exports.connectDB = connectDB;
