import { StylesService } from './providers/styles.service';
import { CreateStyleDto } from './dtos/create-style.dto';
export declare class StylesController {
    private readonly stylesService;
    constructor(stylesService: StylesService);
    createStyle(createStyleDto: CreateStyleDto): Promise<import("./style.entity").Style>;
}
