import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    return { success: true, room };
  }

  // Broadcast attendance update
  broadcastAttendanceUpdate(collegeId: number, data: any) {
    this.server.to(`college-${collegeId}`).emit('attendance-update', data);
  }

  // Broadcast marks update
  broadcastMarksUpdate(studentUserId: number, data: any) {
    this.server.to(`student-${studentUserId}`).emit('marks-update', data);
  }

  // Broadcast dashboard update
  broadcastDashboardUpdate(collegeId: number, data: any) {
    this.server.to(`dashboard-${collegeId}`).emit('dashboard-update', data);
  }
}
