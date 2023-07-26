const cluster = require('cluster');
const os = require('os');
const app = require('./app');

function startServer() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started and listening on port ${PORT}`);
  });
}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const numCPUs = os.cpus().length;

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit and restart if any worker exits
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // If the current process is a worker, start the Express app
  startServer();
}
