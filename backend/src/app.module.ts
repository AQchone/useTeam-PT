import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ExportModule } from './export/export.module';
import { RealtimeGateway } from './realtime/realtime.gateway';
import { RealtimeModule } from './realtime/realtime.module';
import type { MongoMemoryServer } from 'mongodb-memory-server';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const explicitUri = process.env.MONGODB_URI;
        if (explicitUri) {
          return { uri: explicitUri };
        }
        if (process.env.USE_IN_MEMORY_DB === 'true') {
          const { MongoMemoryServer } = await import('mongodb-memory-server');
          const mem: MongoMemoryServer = await MongoMemoryServer.create();
          return { uri: mem.getUri() };
        }
        return { uri: 'mongodb://localhost:27017/kanban-board' };
      },
    }),
    TasksModule,
    ExportModule,
    RealtimeModule,
  ],
  controllers: [AppController],
  providers: [AppService, RealtimeGateway],
})
export class AppModule {}
