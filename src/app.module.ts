import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConfig } from './infrastucture/config/database-config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env']
    }),
    TypeOrmModule.forRoot(DataBaseConfig.getDataBaseConfig())
  ],
  providers: [],
})
export class AppModule { }
