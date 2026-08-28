"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.get('/', async (_req, res, next) => {
    try {
        const users = await User_1.UserModel.find().lean();
        res.json({ data: users });
    }
    catch (error) {
        next(error);
    }
});
