const http = require('http');
const fs = require('fs');
const path = require('path');

const routes = {
  '/': {
    method: 'GET',
    handler: handleRoot
  },
  '/about': {
    method: 'GET',
    handler: handleAbout
  },
  default: {
    method: 'GET',
    handler: handleNotFound
  }
};

const server = http.createServer((req, res) => {
  const route = routes[req.url] || routes.default;
  if (req.method === route.method) {
    route.handler(req, res);
  } else {
    sendResponse(res, 405, 'text/plain', 'Method Not Allowed');
  }
});

function handleRoot(req, res) {
  const filePath = path.join(__dirname, 'file.txt');
  readFileContent(filePath, (err, data) => {
    if (err) {
      sendResponse(res, 500, 'text/plain', 'Internal Server Error');
    } else {
      sendResponse(res, 200, 'text/plain', data);
    }
  });
}

function handleAbout(req, res) {
  sendResponse(res, 200, 'text/plain', 'This is the About page');
}

function handleNotFound(req, res) {
  sendResponse(res, 404, 'text/plain', 'Page not found');
}

function readFileContent(filePath, callback) {
  fs.readFile(filePath, 'utf8', callback);
}

function sendResponse(res, statusCode, contentType, content) {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(content);
}

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});