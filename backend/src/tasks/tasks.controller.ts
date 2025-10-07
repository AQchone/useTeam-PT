import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto, IdParamDto, UpdateTaskDto } from './dto';
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
  create(@Body() body: CreateTaskDto) {
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
    @Param() { id }: IdParamDto,
    @Body() body: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, body).then((task) => {
      this.realtime.emitTaskUpdated(task);
      return task;
    });
  }

  @Delete(':id')
  remove(@Param() { id }: IdParamDto) {
    return this.tasksService.remove(id).then(() => {
      this.realtime.emitTaskDeleted(id);
      return { deleted: true };
    });
  }
}
