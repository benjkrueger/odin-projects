import http from 'node:http';
import fs from 'node:fs'
import path from 'node:path'
const __dirname = import.meta.dirname;
const ROUTES = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact': 'contact-me.html'
};

http.createServer(function (req, res) {
    const urlPath = (req.url || '/').split('?')[0];
    const fileName = ROUTES[urlPath];
    console.log(urlPath, fileName)
    if (!fileName) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
        return;
    }

    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, (err, content) => {
        if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Internal Server Error');
        return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    })
}).listen(8080);
