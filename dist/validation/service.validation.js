"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
class ServiceValidation {
}
exports.ServiceValidation = ServiceValidation;
ServiceValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1).max(100),
    price: zod_1.z.number().positive(),
    capacity: zod_1.z.number().positive()
});
ServiceValidation.GET = zod_1.z.object({
    page: zod_1.z.number().positive().optional(),
    limit: zod_1.z.number().positive().optional()
});
ServiceValidation.UPDATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    description: zod_1.z.string().min(1).max(100).optional(),
    price: zod_1.z.number().positive().optional(),
    capacity: zod_1.z.number().positive().optional()
});
