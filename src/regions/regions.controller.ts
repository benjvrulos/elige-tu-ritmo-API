import { Controller, Get } from '@nestjs/common';
import { RegionsService } from './providers/regions.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Auth(AuthType.None)
  @Get()
  public getAllRegions() {
    return this.regionsService.findAll();
  }
}
