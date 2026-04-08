import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AcademiesService } from './providers/academies.service';
import { CreateAcademyDto } from './dtos/create-academy.dto';
import { GetAcademiesDto } from './dtos/get-academies.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { type ActiveUserData } from 'src/auth/interfaces/active-user.interfaces';

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
  @Get()
  public getAcademies(@Query() postQuery: GetAcademiesDto) {
    return this.academyService.findAll(postQuery);
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
  public createAcademy(
    @Body() createAcademyDto: CreateAcademyDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.academyService.create(createAcademyDto, user);
  }
}
