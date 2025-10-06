import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ExportModule } from './export/export.module';
import { RealtimeGateway } from './realtime/realtime.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/kanban-board',
    ),
    TasksModule,
    ExportModule,
  ],
  controllers: [AppController],
  providers: [AppService, RealtimeGateway],
})
export class AppModule {}
