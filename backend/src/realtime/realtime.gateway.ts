import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { Task } from '../tasks/tasks.schema';

@WebSocketGateway({ cors: { origin: '*' } })
export class RealtimeGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    // Sin operación; se podría añadir autenticación en el futuro
  }

  emitTaskCreated(task: Task) {
    this.server.emit('task:created', task);
  }

  emitTaskUpdated(task: Task) {
    this.server.emit('task:updated', task);
  }

  emitTaskDeleted(id: string) {
    this.server.emit('task:deleted', { id });
  }
}
