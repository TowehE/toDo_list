// todo-list.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList, TodoListDocument } from 'src/schemas/todo-list.schema';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { User, UserDocument } from 'src/schemas/User.schema';

@Injectable()
export class TodoListService {
  constructor(
    @InjectModel(TodoList.name) private todoListModel: Model<TodoListDocument>,
  @InjectModel(User.name) private readonly userModel: Model<UserDocument>
)
   {}

  async createTodoList(userId: string, createTodoListDto: CreateTodoListDto): Promise<TodoList> {
    try {
      // Validate or handle createTodoListDto if needed
      const { title, description, dueDate } = createTodoListDto;

      const existingTodoList = await this.todoListModel.findOne({  user: userId, title });
      if (existingTodoList) {
        throw new HttpException('A todo list with the same title already exists', HttpStatus.BAD_REQUEST);
      }

      const newTodoList = new this.todoListModel({
        title,
        description,
        dueDate,
        user: userId,
      });

      return await newTodoList.save();
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTodoList(todoListId: string): Promise<TodoList> {
    try {
      // Fetch the TodoList document by its ID and populate the user field
      const todoList = await this.todoListModel.findById(todoListId).populate('user').exec();
    
      if (!todoList) {
        throw new HttpException('Todo list not found', HttpStatus.NOT_FOUND);
      }
      return todoList;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTodoList(todoListId: string, updateTodoListDto: UpdateTodoListDto): Promise<TodoList> {
    try {
      const { title, description, dueDate } = updateTodoListDto;

      const todoList = await this.todoListModel.findById(todoListId);
      if (!todoList) {
        throw new HttpException('Todo list not found', HttpStatus.NOT_FOUND);
      }

      todoList.title = title || todoList.title;
      todoList.description = description || todoList.description;
      todoList.dueDate = dueDate || todoList.dueDate;

      return await todoList.save();
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteTodoList(todoListId: string): Promise<void> {
    try {
      const todoList = await this.todoListModel.findByIdAndDelete(todoListId);
      if (!todoList) {
        throw new HttpException('Todo list not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}



