import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import { Academy } from './academy.entity';
import { PatchAcademyDto } from './dtos/update-academy.dto';

@Controller('academies')
@ApiTags('Academies')
export class AcademiesController {
  constructor(
    // Injecting Academy Service
    private readonly academyService: AcademiesService,
  ) {}

  private mapAcademy(academy: Academy) {
    const { comuna, ...rest } = academy;
    const { region, ...comunaRest } = comuna ?? {};

    return {
      ...rest,
      region: region ?? null,
      comuna: comunaRest ?? null,
    };
  }

  @ApiOperation({ summary: 'Retrieve all academies' })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response if you response is processed successfully',
  })
  @Auth(AuthType.None)
  @Get()
  public async getAcademies(@Query() postQuery: GetAcademiesDto) {
    const result = await this.academyService.findAll(postQuery, {
      relations: ['comuna', 'comuna.region', 'styles', 'image'],
    });

    return {
      ...result,
      data: result.data.map((academy) => this.mapAcademy(academy)),
    };
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
        description: { type: 'string' },
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

  @ApiOperation({ summary: 'Updates an existing academy' })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response if the academy was updated successfully',
  })
  @ApiBearerAuth()
  @Patch()
  public updateAcademy(@Body() patchAcademyDto: PatchAcademyDto) {
    return this.academyService.update(patchAcademyDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.academyService.remove(id);
  }
}
