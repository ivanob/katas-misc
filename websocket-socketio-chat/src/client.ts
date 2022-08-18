import {io} from 'socket.io-client'
const prompt = require('prompt-sync')({sigint: true});
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

/**
 * Listener for reading the user lines
 */
rl.on('line', (line: any) => {
    process.stdout.write('>> ');
})

const socket = io('http://localhost:3000')
socket.on('connect', () => {
    console.log(`You connected with ID=${socket.id}`)
    process.stdout.write('>> ');
});



console.log('Running chat client')
