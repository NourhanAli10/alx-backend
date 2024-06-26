import kue from 'kue';

// Sample job data array
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

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

// Process each job in the jobs array
jobs.forEach((jobData, index) => {
  // Create a job in the queue 'push_notification_code_2'
  const job = queue.create('push_notification_code_2', jobData);

  // Event listeners for job lifecycle
  job.on('enqueue', () => {
    console.log(`Notification job created: ${job.id}`);
  });

  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.error(`Notification job ${job.id} failed: ${err}`);
  });

  job.on('progress', (progress) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });

  // Save the job to the queue
  job.save((err) => {
    if (err) {
      console.error('Error creating job:', err);
    } else {
      console.log(`Job saved to queue with ID ${job.id}`);
    }
  });
});
