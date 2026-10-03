import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8' };
const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const safePath = requestPath === '/' ? '/index.html' : requestPath;
  const filePath = path.resolve(root, `.${safePath}`);
  if (!filePath.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(filePath, (error, data) => {
    if (error) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream', 'Cache-Control':'no-cache'}); res.end(data);
  });
});
server.listen(port, '0.0.0.0', () => console.log(`Pentora static server listening on ${port}`));
