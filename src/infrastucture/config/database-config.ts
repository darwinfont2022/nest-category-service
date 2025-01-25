import { Injectable, Type } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AttributeEntity } from "../../domain/entities/attribute.entity";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { CategoryItemEntity } from "../../domain/entities/item.entity";
import { ValueEntity } from "../../domain/entities/value.entity";

export class DataBaseConfig {

    constructor(
    ) { }

    public static getDataBaseConfig(): TypeOrmModuleOptions {
        const database = this.loadEvnConfig().database;
        return {
            type: 'postgres',
            host: database.host,
            port: database.port,
            username: database.user,
            password: database.password,
            database: database.name,
            entities: [
                CategoryEntity,
                AttributeEntity,
                ValueEntity,
                CategoryItemEntity

            ],
            synchronize: true,
            logging: database.logging,
        }
    }

    public static loadEvnConfig() {
        const log = !!process.env.LOGGING || false
        return {
            port: parseInt(process.env.PORT, 10) || 3000,
            database: {
                host: process.env.DATABASE_HOST || "localhost",
                port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
                user: process.env.DATABASE_USER || "root",
                password: process.env.DATABASE_PASSWORD || "password",
                name: process.env.DATABASE_NAME || "postgres",
                logging: log
            }
        }
    }
}