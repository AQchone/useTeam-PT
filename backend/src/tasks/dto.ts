import { IsEnum, IsMongoId, IsOptional, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(1, 200)
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['todo', 'doing', 'done'])
  @IsOptional()
  column?: 'todo' | 'doing' | 'done';
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @Length(1, 200)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['todo', 'doing', 'done'])
  @IsOptional()
  column?: 'todo' | 'doing' | 'done';
}

export class IdParamDto {
  @IsMongoId()
  id!: string;
}


