"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('profileConfig', () => ({
    apiKey: process.env.PROFILE_API_KEY,
}));
//# sourceMappingURL=profile.config.js.map