import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RealtimeGateway } from '../realtime/realtime.gateway';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly realtime: RealtimeGateway,
  ) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() body: { title: string; description?: string; column?: 'todo' | 'doing' | 'done' }) {
    return this.tasksService.create({
      title: body.title,
      description: body.description ?? '',
      column: body.column ?? 'todo',
    }).then((task) => {
      this.realtime.emitTaskCreated(task);
      return task;
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<{ title: string; description: string; column: 'todo' | 'doing' | 'done' }>,
  ) {
    return this.tasksService.update(id, body).then((task) => {
      this.realtime.emitTaskUpdated(task);
      return task;
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id).then(() => {
      this.realtime.emitTaskDeleted(id);
      return { deleted: true };
    });
  }
}
