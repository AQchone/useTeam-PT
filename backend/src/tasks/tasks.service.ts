import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './tasks.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(data: Pick<Task, 'title' | 'description' | 'column'>) {
    const created = await this.taskModel.create(data);
    return created.toObject();
  }

  async findAll() {
    return this.taskModel.find().lean();
  }

  async update(id: string, data: Partial<Pick<Task, 'title' | 'description' | 'column'>>) {
    const updated = await this.taskModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean();
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.taskModel.findByIdAndDelete(id).lean();
    if (!res) throw new NotFoundException('Task not found');
    return { deleted: true };
  }
}
