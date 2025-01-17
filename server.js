const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express application
const app = express();
const server = http.createServer(app);

// Attach Socket.io to the server
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Simulate car location updates
const carLocation = { lat: 5.6037, lng: -0.1870 }; // Starting point
let interval;

// Function to simulate location updates
function sendCarLocation() {
  carLocation.lat += (Math.random() - 0.5) * 0.001; // Simulate movement
  carLocation.lng += (Math.random() - 0.5) * 0.001; // Simulate movement
  io.emit('location', carLocation); // Emit car location to all connected clients
}

// Listen for connection events
io.on('connection', (socket) => {
  console.log('A user connected');

  // Start sending car location updates
  interval = setInterval(sendCarLocation, 1000); // Update every second

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    clearInterval(interval); // Stop sending updates
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
