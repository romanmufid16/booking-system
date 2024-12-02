"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const database_1 = require("../app/database");
const service_model_1 = require("../models/service.model");
const service_validation_1 = require("../validation/service.validation");
const validation_1 = require("../validation/validation");
const error_response_1 = require("../errors/error.response");
class ServiceService {
    static checkServiceExist(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield database_1.prismaClient.service.findUnique({
                where: {
                    id: serviceId
                }
            });
            if (!service) {
                throw new error_response_1.ResponseError(404, "Service not found");
            }
            return service;
        });
    }
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(service_validation_1.ServiceValidation.CREATE, req);
            const service = yield database_1.prismaClient.service.create({
                data: createRequest
            });
            return (0, service_model_1.toServiceResponse)(service);
        });
    }
    static list(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequest = validation_1.Validation.validate(service_validation_1.ServiceValidation.GET, req);
            const page = getRequest.page;
            const limit = getRequest.limit;
            const offset = (page - 1) * limit;
            const totalServices = yield database_1.prismaClient.service.count({
                where: {
                    capacity: {
                        gt: 0 // Memastikan kapasitas lebih besar dari 0
                    }
                }
            });
            const services = yield database_1.prismaClient.service.findMany({
                skip: offset,
                take: limit,
                where: {
                    capacity: {
                        gt: 0 // Memastikan kapasitas lebih besar dari 0
                    }
                }
            });
            const serviceResponses = services.map(service_model_1.toServiceResponse);
            return {
                services: serviceResponses,
                total: totalServices,
                page,
                showing: (serviceResponses.length > 0 ? serviceResponses.length : 0)
            };
        });
    }
    static update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(service_validation_1.ServiceValidation.UPDATE, req);
            yield this.checkServiceExist(updateRequest.id);
            const service = yield database_1.prismaClient.service.update({
                where: {
                    id: updateRequest.id
                },
                data: updateRequest
            });
            return (0, service_model_1.toServiceResponse)(service);
        });
    }
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkServiceExist(id);
            const service = yield database_1.prismaClient.service.delete({
                where: {
                    id: id
                }
            });
            return (0, service_model_1.toServiceResponse)(service);
        });
    }
}
exports.ServiceService = ServiceService;
