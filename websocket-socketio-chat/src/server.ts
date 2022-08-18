const options = { /* ... */ };
const io = require("socket.io")(3000, options);

io.on("connection", (socket: any) => {
    console.log(`Client with ID=${socket.id} connected`);
    socket.on('send-message', (message: string, room: string) => {
        console.log(`Message received from ${socket.id}: ${message}`, (room)?`(to room ${room})`:'');
        if(room){
            /* The message is to be direvted to some specific room */
            socket.to(room).emit('received-message', message, socket.id, room)
        }else{
            /* I will take the message that came from that particular user and
            broadcast it to all the clients connected */
            socket.broadcast.emit('received-message', message, socket.id)
        }
    })
    socket.on('join-room', (room: string) => {
        console.log(`User: ${socket.id} joined the room: ${room}`);
        socket.join(room);
    });
})

console.log('Running chat server')