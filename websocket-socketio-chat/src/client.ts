import {io} from 'socket.io-client'
const readline = require('readline');

const rooms: string[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const displayRooms = () => console.log(`Connected to rooms: ${rooms}`);

const socket = io('http://localhost:3000')
socket.on('connect', () => {
    console.log(`You connected with ID=${socket.id}`)
    process.stdout.write('>> ');
    /**
     * Listener for reading the user lines
     */
    rl.on('line', (line: any) => {
        if(line.startsWith('JOIN ROOM ')){
            const room = line.split(' ')[2]
            rooms.push(room);
            displayRooms();
            socket.emit('join-room', room);
        }
        else if(line.startsWith('ROOM ')){
            const split = line.split(' ');
            socket.emit('send-message', split[2], split[1])
        } 
        else{
            socket.emit('send-message', line)
        }
        process.stdout.write('>> ');
    })
});

socket.on('received-message', (message: string, fromUser: string, room: string) => {
    console.log(`[${fromUser}]: ${message}`, (room)?`(to room ${room})`:'');
    process.stdout.write('>> ');
})

console.log('Running chat client')
console.log('If you want to join a room type: JOIN ROOM <name_of_room>')
console.log('If you want to send a message to a room type: ROOM <name_of_room> <message>')
displayRooms();