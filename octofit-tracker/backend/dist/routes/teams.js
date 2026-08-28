"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsRouter = void 0;
const express_1 = require("express");
const Team_1 = require("../models/Team");
const teamsRouter = (0, express_1.Router)();
exports.teamsRouter = teamsRouter;
teamsRouter.get('/', async (_req, res, next) => {
    try {
        const teams = await Team_1.TeamModel.find().populate('members').lean();
        res.json({ data: teams });
    }
    catch (error) {
        next(error);
    }
});
