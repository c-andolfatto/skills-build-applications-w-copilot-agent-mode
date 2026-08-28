"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardRouter = void 0;
const express_1 = require("express");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const leaderboardRouter = (0, express_1.Router)();
exports.leaderboardRouter = leaderboardRouter;
leaderboardRouter.get('/', async (_req, res, next) => {
    try {
        const leaderboard = await LeaderboardEntry_1.LeaderboardEntryModel.find()
            .sort({ rank: 1 })
            .populate('userId')
            .lean();
        res.json({ data: leaderboard });
    }
    catch (error) {
        next(error);
    }
});
