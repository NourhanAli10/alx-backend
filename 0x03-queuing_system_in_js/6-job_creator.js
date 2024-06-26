import kue from 'kue';
import { v4 as uuidv4 } from 'uuid';

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

// Sample data for the job
const jobData = {
  phoneNumber: '1234567890',
  message: 'Sample notification message',
};

// Create a job in the queue
const job = queue.create('push_notification_code', jobData);

// Event listeners for the job
job.on('enqueue', () => {
  console.log(`Notification job created: ${job.id}`);
});

job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', (err) => {
  console.error('Notification job failed', err);
});

// Save the job to the queue
job.save((err) => {
  if (err) {
    console.error('Error creating job:', err);
  } else {
    console.log(`Job saved to queue with ID ${job.id}`);
  }
});
