import redis from 'redis';

// Create a Redis client
const subscriber = redis.createClient();

// Handle connection events
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the channel 'holberton school channel'
subscriber.subscribe('holberton school channel');

// Handle incoming messages
subscriber.on('message', (channel, message) => {
  console.log(`Received message on channel ${channel}: ${message}`);
  
  // Check for KILL_SERVER message
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
    console.log('Unsubscribed from channel and quitting...');
  }
});
