"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutsRouter = void 0;
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const workoutsRouter = (0, express_1.Router)();
exports.workoutsRouter = workoutsRouter;
workoutsRouter.get('/', async (_req, res, next) => {
    try {
        const workouts = await Workout_1.WorkoutModel.find().lean();
        res.json({ data: workouts });
    }
    catch (error) {
        next(error);
    }
});
