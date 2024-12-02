"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const error_response_1 = require("../errors/error.response");
const checkRole = (req, res, next) => {
    if (req.user.role === 'user') {
        throw new error_response_1.ResponseError(401, 'Unauthorized');
    }
    next();
};
exports.checkRole = checkRole;
