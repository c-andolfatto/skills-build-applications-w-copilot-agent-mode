"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitiesRouter = void 0;
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const activitiesRouter = (0, express_1.Router)();
exports.activitiesRouter = activitiesRouter;
activitiesRouter.get('/', async (_req, res, next) => {
    try {
        const activities = await Activity_1.ActivityModel.find().populate('userId').lean();
        res.json({ data: activities });
    }
    catch (error) {
        next(error);
    }
});
