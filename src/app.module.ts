import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';
import { TodoListModule } from './todo-list/todo-list.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nestjs_todolist'),
    UsersModule,
    TodoListModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
