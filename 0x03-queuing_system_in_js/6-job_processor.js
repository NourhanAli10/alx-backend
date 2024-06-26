import kue from 'kue';

// Create a Kue queue connected to Redis
const queue = kue.createQueue();

// Handle queue creation event
queue.on('ready', () => {
  console.log('Kue connected to Redis and ready to process jobs');
});

// Handle queue error event
queue.on('error', (err) => {
  console.error('Error in Kue: ', err);
});

// Function to send notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs from the queue 'push_notification_code'
queue.process('push_notification_code', (job, done) => {
  // Extract job data
  const { phoneNumber, message } = job.data;
  
  // Call sendNotification function
  sendNotification(phoneNumber, message);

  // Complete the job
  done();
});
