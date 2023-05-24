import EventEmitter from 'events';

// Create an event emitter instance
const myEmitter = new EventEmitter();

// Define an event listener
myEmitter.on('myEvent', (data) => {
  console.log('Event occurred:', data);
});

// Emit an event
myEmitter.emit('myEvent', 'Hello, world!');

/**
 * Simple asynchronicity achieved via events. At the core of the event-driven architecture is the 
 * EventEmitter module, which is a built-in module in Node.js. It provides the ability to emit events 
 * and handle event listeners. The event-driven architecture in Node.js revolves around the concept 
 * of events and event handling. In this architecture, various parts of your application can emit 
 * events, and other parts of the application can listen to and respond to those events.
 */ 