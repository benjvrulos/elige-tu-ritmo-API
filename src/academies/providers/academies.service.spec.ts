import { Test, TestingModule } from '@nestjs/testing';
import { AcademiesService } from './academies.service';
import { DataSource } from 'typeorm';
import { StylesService } from 'src/styles/providers/styles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Academy } from '../academy.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { CreateAcademyProvider } from './create-academy.provider';
import { UploadsService } from 'src/uploads/providers/uploads.service';

describe('AcademiesService', () => {
  let service: AcademiesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcademiesService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Academy), useValue: {} },
        { provide: StylesService, useValue: {} },
        { provide: PaginationProvider, useValue: {} },
        { provide: CreateAcademyProvider, useValue: {} },
        { provide: UploadsService, useValue: {} },
      ],
    }).compile();

    service = module.get<AcademiesService>(AcademiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('createUser', () => {
  //   it('should be defined', () => {});
  //   it('should call createUser on CreateUserProvider', async () => {});
  // });
});
