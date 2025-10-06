import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, enum: ['todo', 'doing', 'done'], default: 'todo' })
  column: 'todo' | 'doing' | 'done';

  @Prop({ type: Date })
  createdAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

