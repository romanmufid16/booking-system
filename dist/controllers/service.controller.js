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
exports.ServiceController = void 0;
const service_service_1 = require("../services/service.service");
const logging_1 = require("../app/logging");
class ServiceController {
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    page: parseInt(req.query.page, 10) || 1,
                    limit: parseInt(req.query.limit, 10) || 10
                };
                const result = yield service_service_1.ServiceService.list(request);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const result = yield service_service_1.ServiceService.create(request);
                res.status(201).json({
                    message: 'Service berhasil dibuat',
                    service: result
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = req.params.id;
                const response = yield service_service_1.ServiceService.update(request);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json({
                    message: 'Service berhasil diupdate',
                    service: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceId = req.params.id;
                const response = yield service_service_1.ServiceService.remove(serviceId);
                logging_1.logger.debug("response : " + JSON.stringify(response));
                res.status(200).json({
                    message: "Service berhasil dihapus"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ServiceController = ServiceController;
