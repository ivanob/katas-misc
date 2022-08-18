const options = { /* ... */ };
const io = require("socket.io")(3000, options);

io.on("connection", (socket: any) => {
    console.log(`Client with ID=${socket.id} connected`);
})

console.log('Running chat server')