"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const database_1 = require("./config/database");
const env_1 = require("./config/env");
async function startServer() {
    await (0, database_1.connectDatabase)();
    app_1.app.listen(env_1.PORT, () => {
        console.log(`OctoFit API listening on port ${env_1.PORT}`);
        console.log(`API base URL: ${env_1.apiBaseUrl}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
