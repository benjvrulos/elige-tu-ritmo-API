import { Body, Controller, Get, Post } from '@nestjs/common';
import { StylesService } from './providers/styles.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateStyleDto } from './dtos/create-style.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('styles')
export class StylesController {
  constructor(
    // Injecting Styles Service
    private readonly stylesService: StylesService,
  ) {}

  @ApiOperation({ summary: 'Creates a new style' })
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response if you response is created successfully',
  })
  @Post()
  public createStyle(@Body() createStyleDto: CreateStyleDto) {
    return this.stylesService.create(createStyleDto);
  }

  @Auth(AuthType.None)
  @Get()
  public getAllStyles() {
    return this.stylesService.findAll();
  }
}
