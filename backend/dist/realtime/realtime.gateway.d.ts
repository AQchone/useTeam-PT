import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class RealtimeGateway implements OnGatewayConnection {
    server: Server;
    handleConnection(): void;
    emitTaskCreated(task: any): void;
    emitTaskUpdated(task: any): void;
    emitTaskDeleted(id: string): void;
}
