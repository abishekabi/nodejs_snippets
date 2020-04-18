var events = require('events');
var eventEmitter = new events.EventEmitter(); 

var eventHandler = function () {
    console.log('Event 1');
}
  
var eventHandler2 = function () {
    console.log('Event 2');
}

eventEmitter.on('custom_event', eventHandler);
eventEmitter.on('custom_event-2', eventHandler2);

eventEmitter.emit('custom_event');

eventEmitter.emit('custom_event-2');