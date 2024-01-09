const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let reqType = req.url;
  console.log(reqType);
  switch (req.url) {
    case '/about':
      reqType = 'about.html';
      break;
    case '/contact-me':
      reqType = 'contact-me.html';
      break;
    case '/':
      reqType = 'index.html';
      break;
  }
  const dynamicPath = path.join(__dirname, reqType);
  console.log(dynamicPath);
  fs.readFile(dynamicPath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        const errHtml = path.join(__dirname, '404.html');
        fs.readFile(errHtml, (err, content) => {
          res.writeHead(404, { ContentType: 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        const errCode = err.code;
        res.writeHead(500);
        res.end(`Server error code: ${errCode}`);
      }
    } else {
      res.writeHead(200, { ContentType: 'text/html' });
      res.end(content, 'utf-8');
    }
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
