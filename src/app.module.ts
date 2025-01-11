import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConfig } from './infrastucture/config/database-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './infrastucture/persistence/category.repository';
import { CategoryInterface } from './domain/interfaces/category.interface'
import { CategoryEntity } from './domain/entities/category.entity';
import { CategoryCreate } from './application/use-case/category/category-create';
import { CategoryController } from './infrastucture/controller/category.controller';
import { AttributeEntity } from './domain/entities/attribute.entity';
import { ValueEntity } from './domain/entities/value.entity';
import { CategoryLoad } from './application/use-case/category/category-load.use-case';
import { CategoryUpdate } from './application/use-case/category/category-update.use-case';
import { CategoryDelete } from './application/use-case/category/category-delete.use-case';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env']
    }),
    TypeOrmModule.forRoot(DataBaseConfig.getDataBaseConfig()),
    TypeOrmModule.forFeature([
      CategoryEntity, AttributeEntity, ValueEntity
    ])
  ],
  controllers: [CategoryController],
  providers: [
    { provide: CategoryInterface, useClass: CategoryRepository },
    CategoryCreate, CategoryLoad, CategoryUpdate, CategoryDelete
  ]
})
export class AppModule { }
