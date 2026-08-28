"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
async function connectDatabase() {
    await mongoose_1.default.connect(env_1.mongoConnectionString);
    console.log('Connected to octofit_db');
}
exports.db = mongoose_1.default.connection;
exports.db.on('error', (error) => {
    console.error('connection error:', error);
});
