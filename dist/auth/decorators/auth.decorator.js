"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("../constants/auth.constants");
const Auth = (...authType) => (0, common_1.SetMetadata)(auth_constants_1.AUTH_TYPE_KEY, authType);
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map