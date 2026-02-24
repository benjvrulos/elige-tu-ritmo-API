import { Module } from '@nestjs/common';
import { Comuna } from './comuna.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComunasService } from './providers/comunas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comuna])],
  providers: [ComunasService],
  exports: [ComunasService],
})
export class ComunasModule {}
