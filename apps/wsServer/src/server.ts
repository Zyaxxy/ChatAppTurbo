// import WebSocket, { WebSocketServer } from 'ws';
// import { prisma } from "@repo/db";


// import type { IncomingMessage, OutgoingMessage } from './types';

// import * as dotenv from 'dotenv';
// dotenv.config();


// const PORT = Number(process.env.PORT ?? 4000);

// // In-memory room map
// const rooms = new Map<string, Set<WebSocket>>();

// const wss = new WebSocketServer({ port: PORT });

// wss.on('connection', (ws) => {
//   ws.on('message', async (raw) => {
//     let msg: IncomingMessage;
//     try {
//       msg = JSON.parse(String(raw));
//     } catch {
//       send(ws, { type: 'error', message: 'Invalid JSON' });
//       return;
//     }

//     if (!msg || typeof msg !== 'object' || !('type' in msg)) {
//       send(ws, { type: 'error', message: 'Invalid message format' });
//       return;
//     }

//     try {
//       if (msg.type === 'join') {
//         joinRoom(msg.room, ws);
//         send(ws, { type: 'joined', room: msg.room });
//       } else if (msg.type === 'leave') {
//         leaveRoom(msg.room, ws);
//         send(ws, { type: 'left', room: msg.room });
//       } else if (msg.type === 'message') {
//         // Persist message in Prisma
//         const saved = await prisma.message.create({
//           data: {
//             room: msg.room,
//             sender: msg.user,
//             content: msg.content,
//           },
//         });

//         const out: OutgoingMessage = {
//           type: 'message',
//           id: saved.id,
//           room: saved.room,
//           user: saved.sender,
//           content: saved.content,
//           createdAt: saved.createdAt.toISOString(),
//         };

//         broadcastToRoom(msg.room, out);
//       } else if (msg.type === 'ping') {
//         send(ws, { type: 'pong' });
//       } else {
//         send(ws, { type: 'error', message: 'Unknown message type' });
//       }
//     } catch (err) {
//       console.error('Error handling message', err);
//       send(ws, { type: 'error', message: 'Server error' });
//     }
//   });

//   ws.on('close', () => {
//     // Remove from all rooms
//     for (const [room, set] of rooms.entries()) {
//       if (set.has(ws)) {
//         set.delete(ws);
//         if (set.size === 0) rooms.delete(room);
//       }
//     }
//   });
// });
