const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);

  emitter.emit("response", `Greeted ${name}`);
});

emitter.on("response", (message) => {
  console.log(`Received response: ${message}`);
});

emitter.emit("greet", "Rose");

setInterval(() => {
  emitter.emit("timerEvent", "The clock is ticking...");
}, 3000);

emitter.on("timerEvent", (msg) => console.log(msg));
