const options = { /* ... */ };
import 'dotenv/config';
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
    /**
     * The second parameter is interesting, cause it is a callback: a function implemented in the
     * client that we can call from the server thanks that a websocket. It is opening
     * a websocket connection to do this work.
     */
    socket.on('join-room', (room: string, callback: (str: string)=>void) => {
        console.log(`User: ${socket.id} joined the room: ${room}`);
        socket.join(room);
        callback(`Joined the room ${room} sucessfully!`);
    });
})

/**
 * This is the middleware I am setting over the socket in order to
 * authenticate users of the chat. They need to pass me a token so
 * I can verify they are authorized.
 * - socket is the info of the socket we are connecting with,
 * - next is a function to call to the next middleware if everything worked out
 */
io.use((socket: any, next: any) => {
    const {token} = socket.handshake.auth;
    if(token && token === process.env.TOKEN){
        console.log(`${socket.id} provided a valid auth token!`);
        next();
    }else{
        next(new Error('Please send a valid token'))
    }
})

console.log('Running chat server')