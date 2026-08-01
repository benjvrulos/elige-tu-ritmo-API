import { Module } from '@nestjs/common';
import { StylesService } from './providers/styles.service';
import { StylesController } from './styles.controller';
import { Style } from './style.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Style])],
  exports: [StylesService],
  providers: [StylesService],
  controllers: [StylesController],
})
export class StylesModule {}
