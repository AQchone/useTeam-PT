import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { Task } from '../tasks/tasks.schema';
export declare class RealtimeGateway implements OnGatewayConnection {
    server: Server;
    handleConnection(): void;
    emitTaskCreated(task: Task): void;
    emitTaskUpdated(task: Task): void;
    emitTaskDeleted(id: string): void;
}
