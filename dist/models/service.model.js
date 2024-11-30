"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toServiceResponse = toServiceResponse;
function toServiceResponse(service) {
    return {
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        capacity: service.capacity
    };
}
