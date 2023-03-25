import {io} from 'socket.io-client'
import 'dotenv/config';
const readline = require('readline');

const rooms: string[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const displayRooms = () => console.log(`Connected to rooms: ${rooms}`);
/* This is a silly function to proff the call of code in the client
from the server */
const displayMessage = (str: string) => {
    console.log(str);
    process.stdout.write('>> ');
};

const socket = io('http://localhost:3000', {auth: {token: process.env.TOKEN}})

/**
 * This event is received when the user stablish a successful connection to the server.
 * What I do here is start an infinite loop where the user can prompt messages 
 * directly to the server, and he will handle them (broadcast, send to specifici room...)
 */
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
            socket.emit('join-room', room, displayMessage);
        }
        else if(line.startsWith('ROOM ')){
            const split = line.split(' ');
            const room = split[1]
            const msg = split[2]
            socket.emit('send-message', msg, room)
        } 
        else{
            socket.emit('send-message', line)
        }
        process.stdout.write('>> ');
    })
});

/**
 * Event received in the websocket is that we have received a message from
 * another user.
 */
socket.on('received-message', (message: string, fromUser: string, room: string) => {
    console.log(`[${fromUser}]: ${message}`, (room)?`(to room ${room})`:'');
    process.stdout.write('>> ');
})

/**
 * When there is an error, i.e: failed authentication, the server notifies the
 * client using this event. 
 */
socket.on('connect_error', error => {
    console.error(`ERROR: ${error.message}`);
})

console.log('Running chat client')
console.log('If you want to join a room type: JOIN ROOM <name_of_room>')
console.log('If you want to send a message to a room type: ROOM <name_of_room> <message>')
displayRooms();