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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationProvider = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let PaginationProvider = class PaginationProvider {
    request;
    constructor(request) {
        this.request = request;
    }
    async paginateQuery(paginationQuery, repository) {
        const results = await repository.find({
            skip: ((paginationQuery.page || 1) - 1) * (paginationQuery.limit || 10),
            take: paginationQuery.limit,
        });
        const baseUrl = this.request.protocol + '://' + this.request.headers.host + '/';
        const newUrl = new URL(this.request.url, baseUrl);
        const totalItems = await repository.count();
        const totalPages = Math.ceil(totalItems / (paginationQuery.limit || 1));
        const nextPage = paginationQuery === totalPages
            ? paginationQuery?.page
            : (paginationQuery?.page || 0) + 1;
        const previousPage = paginationQuery.page === 1
            ? paginationQuery?.page
            : (paginationQuery?.page || 0) - 1;
        const finalResponse = {
            data: results,
            meta: {
                itemsPerPage: paginationQuery.limit || 1,
                totalItems: totalItems,
                currentPage: paginationQuery.page || 1,
                totalPages: totalPages,
            },
            links: {
                first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
                last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
                current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
                next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
                previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
            },
        };
        return finalResponse;
    }
};
exports.PaginationProvider = PaginationProvider;
exports.PaginationProvider = PaginationProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], PaginationProvider);
//# sourceMappingURL=pagination.provider.js.map