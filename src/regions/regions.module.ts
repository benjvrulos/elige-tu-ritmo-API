import { Module } from '@nestjs/common';
import { Region } from './region.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Region])] })
export class RegionsModule {}
