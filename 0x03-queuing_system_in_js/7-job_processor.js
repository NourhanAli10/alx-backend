import kue from 'kue';

// Array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notification
function sendNotification(phoneNumber, message, job, done) {
  // Track job progress from 0 to 100%
  job.progress(0, 100);

  // Check if phoneNumber is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job with an error
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Update job progress to 50%
  job.progress(50, 100);

  // Simulate sending notification (in real scenario, this would be an actual notification service)
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Complete the job
  done();
}

// Create a Kue queue connected to Redis
const queue = kue.createQueue({
  prefix: 'q',
  redis: {
    port: 6379,
    host: '127.0.0.1',
  },
});

// Handle queue creation event
queue.on('ready', () => {
  console.log('Kue connected to Redis and ready to process jobs');
});

// Handle queue error event
queue.on('error', (err) => {
  console.error('Error in Kue: ', err);
});

// Process jobs from the queue 'push_notification_code_2' with concurrency of 2
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;

  // Call sendNotification function with job progress tracking
  sendNotification(phoneNumber, message, job, done);
});
