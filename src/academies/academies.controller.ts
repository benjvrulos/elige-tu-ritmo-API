import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AcademiesService } from './providers/academies.service';
import { CreateAcademyDto } from './dtos/create-academy.dto';
import { GetAcademiesDto } from './dtos/get-academies.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { type ActiveUserData } from 'src/auth/interfaces/active-user.interfaces';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('academies')
@ApiTags('Academies')
export class AcademiesController {
  constructor(
    // Injecting Academy Service
    private readonly academyService: AcademiesService,
  ) {}

  @ApiOperation({ summary: 'Retrieve all academies' })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response if you response is processed successfully',
  })
  @Auth(AuthType.None)
  @Get()
  public getAcademies(@Query() postQuery: GetAcademiesDto) {
    return this.academyService.findAll(postQuery, {
      relations: ['comuna', 'comuna.region', 'styles', 'image'],
    });
  }

  @ApiOperation({ summary: 'Retrieve one academy by id' })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response if you response is processed successfully',
  })
  @Get(':academyId')
  public getAcademy(@Param(':academyId') academyId: string) {
    if (academyId) {
      return this.academyService.findOneById(Number(academyId));
    }
  }

  @ApiOperation({ summary: 'Creates a new academy post' })
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response if you response is created successfully',
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        name: { type: 'string' },
        location: { type: 'string' },
        phone: { type: 'string' },
        website_url: { type: 'string' },
        instagram_url: { type: 'string' },
        maps_url: { type: 'string' },
        comuna_id: { type: 'number' },
        style_ids: {
          type: 'array',
          items: { type: 'integer' },
        },
      },
    },
  })
  @ApiBearerAuth()
  public createAcademy(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAcademyDto: CreateAcademyDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.academyService.createAcademy(file, createAcademyDto, user);
  }
}
