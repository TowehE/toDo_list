import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateTodoListDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;
}