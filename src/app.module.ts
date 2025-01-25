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
import { AttributeInterface } from './domain/interfaces/attribute.interface';
import { AttributeRepository } from './infrastucture/persistence/attribute.repository';
import { AttributeController } from './infrastucture/controller/attribute.controller';
import { AttributeCreate } from './application/use-case/attribute/attribute-create.use-case';
import { LoadAttribute } from './application/use-case/attribute/attribute-load.use-case';
import { UpdateAttribute } from './application/use-case/attribute/attribute-update.use-case';
import { IAttributeValue } from './domain/interfaces/value.interface';
import { AttributeValueRepositpry } from './infrastucture/persistence/value.repository';
import { CreateAttributeValue } from './application/use-case/attribute-value/create-value.use-case';
import { UpdateAttributeValue } from './application/use-case/attribute-value/update-value.use-case';
import { DeleteAttributeValue } from './application/use-case/attribute-value/delete-value.use-case';
import { AttributeValueController } from './infrastucture/controller/attribute-value.controller';

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
  controllers: [
    CategoryController,
    AttributeController,
    AttributeValueController
  ],
  providers: [
    { provide: CategoryInterface, useClass: CategoryRepository },
    CategoryCreate, CategoryLoad, CategoryUpdate, CategoryDelete,
    { provide: AttributeInterface, useClass: AttributeRepository },
    AttributeCreate, LoadAttribute, UpdateAttribute,
    { provide: IAttributeValue, useClass: AttributeValueRepositpry },
    CreateAttributeValue, UpdateAttributeValue, DeleteAttributeValue
  ]
})
export class AppModule { }
