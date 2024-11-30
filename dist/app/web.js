"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const publicRoutes_1 = require("../routes/publicRoutes");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const api_1 = require("../routes/api");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = require("../middlewares/error.middleware");
exports.web = (0, express_1.default)();
exports.web.set('trust proxy', true);
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests'
});
exports.web.use((0, helmet_1.default)());
exports.web.use((0, cors_1.default)());
exports.web.use(express_1.default.json());
exports.web.use(limiter);
// web.use(csrfProtection)
exports.web.use('/api/v1', publicRoutes_1.publicRouter);
exports.web.use('/api/v1', auth_middleware_1.authMiddleware, api_1.apiRoutes);
exports.web.use('/', (req, res) => {
    res.send('Hello, world!');
});
exports.web.get('/protected', auth_middleware_1.authMiddleware, (req, res) => {
    res.send({ message: 'This is protected' });
});
exports.web.use(error_middleware_1.errorMiddleware);
