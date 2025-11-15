export type IncomingMessage =
  | { type: 'join'; room: string; user: string }
  | { type: 'leave'; room: string; user: string }
  | { type: 'message'; room: string; user: string; content: string }
  | { type: 'ping' };

export type OutgoingMessage =
  | { type: 'joined'; room: string }
  | { type: 'left'; room: string }
  | { type: 'message'; id: string; room: string; user: string; content: string; createdAt: string }
  | { type: 'error'; message: string }
  | { type: 'pong' };
