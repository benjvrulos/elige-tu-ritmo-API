import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcademiesModule } from './academies/academies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ComunasModule } from './comunas/comunas.module';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [
    AcademiesModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: '1234',
        host: 'localhost',
        database: 'elige-tu-ritmo',
      }),
    }),
    UsersModule,
    ComunasModule,
    RegionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
