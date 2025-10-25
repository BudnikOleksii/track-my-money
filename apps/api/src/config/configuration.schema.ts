import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export const checkIsValidEnvironment = (value: unknown): value is Environment => {
  return Object.values(Environment).some((env) => env === value);
}

export class DatabaseConfig {
  @IsString()
  url!: string;
}

export class AppConfig {
  @IsEnum(Environment)
  @IsOptional()
  @Transform(({ value }) => value || Environment.Development)
  nodeEnv: Environment = Environment.Development;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10) || 3000)
  port: number = 3000;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || 'localhost')
  host: string = 'localhost';
}

export class Configuration {
  app: AppConfig;
  database: DatabaseConfig;

  constructor() {
    this.app = new AppConfig();
    this.database = new DatabaseConfig();
  }
}
