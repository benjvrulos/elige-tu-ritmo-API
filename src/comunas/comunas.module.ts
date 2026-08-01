import { Module } from '@nestjs/common';
import { Comuna } from './comuna.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComunasService } from './providers/comunas.service';
import { ComunasController } from './comunas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comuna])],
  providers: [ComunasService],
  exports: [ComunasService],
  controllers: [ComunasController],
})
export class ComunasModule {}
