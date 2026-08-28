"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const activities_1 = require("./routes/activities");
const leaderboard_1 = require("./routes/leaderboard");
const teams_1 = require("./routes/teams");
const users_1 = require("./routes/users");
const workouts_1 = require("./routes/workouts");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: [env_1.frontendBaseUrl, 'http://localhost:5173']
}));
app.use(express_1.default.json());
app.get('/api', (_req, res) => {
    res.json({
        name: 'OctoFit Tracker API',
        baseUrl: env_1.apiBaseUrl
    });
});
app.use('/api/users', users_1.usersRouter);
app.use('/api/teams', teams_1.teamsRouter);
app.use('/api/activities', activities_1.activitiesRouter);
app.use('/api/leaderboard', leaderboard_1.leaderboardRouter);
app.use('/api/workouts', workouts_1.workoutsRouter);
app.use((error, _req, res, _next) => {
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(500).json({ error: 'Unknown server error' });
});
