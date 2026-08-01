import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
declare class GetAcademiesBaseDto {
    startDate?: Date;
    endDate?: Date;
}
declare const GetAcademiesDto_base: import("@nestjs/common").Type<PaginationQueryDto & GetAcademiesBaseDto>;
export declare class GetAcademiesDto extends GetAcademiesDto_base {
}
export {};
