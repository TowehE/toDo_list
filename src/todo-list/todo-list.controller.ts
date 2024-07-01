import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe, InternalServerErrorException } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { createUserDto } from 'src/users/dto/CreateUser.dto';
import { CreateTodoListDto } from './dto/create-todo-list.dto';


@Controller('todo-lists')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
    try {
      const todoList = await this.todoListService.createTodoList('userId', createTodoListDto); 
      return { message: 'Todo list created successfully', todoList };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create todo list: ' + error.message);
    }
  }

  @Get(':id')
  async getTodoList(@Param('id') id: string) {
    try {
      const todoList = await this.todoListService.getTodoList(id);
      return { todoList };
    } catch (error) {
      throw new InternalServerErrorException('Failed to get todo list: ' + error.message);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateTodoList(@Param('id') id: string, @Body() updateTodoListDto: UpdateTodoListDto) {
    try {
      const todoList = await this.todoListService.updateTodoList(id, updateTodoListDto);
      return { message: 'Todo list updated successfully', todoList };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update todo list: ' + error.message);
    }
  }

  @Delete(':id')
  async deleteTodoList(@Param('id') id: string) {
    try {
      await this.todoListService.deleteTodoList(id);
      return { message: 'Todo list deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete todo list: ' + error.message);
    }
  }
}
// @Post('today')
//   async scheduleTodoListForToday(@Req() req: Request, @Body() CreateTodoListDto: CreateTodoListDto) {
//     try {
//       const userId = req.user.userId;
//       const todoList = await this.todoListService.scheduleTodoListForToday(userId, createTodoListDto);
//       return { message: 'Todo list item scheduled for today', data: todoList };
//     } catch (error) {
//       throw new InternalServerErrorException('Failed to schedule todo list item for today: ' + error.message);
//     }
//   }