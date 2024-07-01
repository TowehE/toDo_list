// todo-list.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './User.schema';

export type TodoListDocument = TodoList & Document;

@Schema()
export class TodoList {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop()
  dueDate: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, 
    ref: User.name }) 
  user: Types.ObjectId; 
}


export const TodoListSchema = SchemaFactory.createForClass(TodoList);
