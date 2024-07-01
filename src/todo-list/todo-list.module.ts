import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { TodoList, TodoListSchema } from 'src/schemas/todo-list.schema';
import { User, UserSchema } from 'src/schemas/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
  {name: User.name, schema:UserSchema},
      { name: TodoList.name, schema: TodoListSchema }]),
  ],
  providers: [TodoListService],
  controllers: [TodoListController],
})
export class TodoListModule {}
