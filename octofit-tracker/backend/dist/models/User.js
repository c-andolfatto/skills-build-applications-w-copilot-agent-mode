"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    fitnessLevel: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    }
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
