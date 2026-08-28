"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnectionString = exports.frontendBaseUrl = exports.apiBaseUrl = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const codespaceName = process.env.CODESPACE_NAME;
exports.PORT = 8000;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${exports.PORT}`;
exports.frontendBaseUrl = codespaceName
    ? `https://${codespaceName}-5173.app.github.dev`
    : 'http://localhost:5173';
exports.mongoConnectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
