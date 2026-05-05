const WebSocket = require('ws');
const setupWSConnection = require('y-websocket/bin/utils.js').setupWSConnection;

const wss = new WebSocket.Server({ port: 1234 });

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req);
});

console.log('Yjs server running on ws://localhost:1234');