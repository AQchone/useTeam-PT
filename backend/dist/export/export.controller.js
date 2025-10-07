"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportController = void 0;
const common_1 = require("@nestjs/common");
const node_fetch_1 = __importDefault(require("node-fetch"));
let ExportController = class ExportController {
    async triggerExport() {
        const webhookUrl = process.env.N8N_WEBHOOK_URL ?? '';
        if (!webhookUrl) {
            return { ok: false, error: 'N8N_WEBHOOK_URL no está configurada' };
        }
        try {
            const res = await (0, node_fetch_1.default)(webhookUrl, { method: 'POST' });
            return { ok: res.ok };
        }
        catch (e) {
            return { ok: false, error: 'No se pudo contactar el webhook de N8N' };
        }
    }
};
exports.ExportController = ExportController;
__decorate([
    (0, common_1.Post)('backlog'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "triggerExport", null);
exports.ExportController = ExportController = __decorate([
    (0, common_1.Controller)('export')
], ExportController);
//# sourceMappingURL=export.controller.js.map