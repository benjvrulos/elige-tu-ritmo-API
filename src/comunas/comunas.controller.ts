import { Controller, Get, Query } from '@nestjs/common';
import { ComunasService } from './providers/comunas.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('comunas')
export class ComunasController {
  constructor(private readonly comunasService: ComunasService) {}
  @Get()
  findByRegion(@Query('regionId') regionId: string) {
    if (regionId) {
      return this.comunasService.findByRegion(+regionId);
    }
    return this.comunasService.findAll();
  }
}
