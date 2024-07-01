import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateTodoListDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;
}