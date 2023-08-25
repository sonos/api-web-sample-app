const http = require('http');
const { url } = require('inspector');
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 8090

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    if(req.url.includes('groups'))
    {
        //this is a mock group response statement
        const fileContent = fs.readFileSync('./group.txt', 'utf-8');
        res.end(fileContent);
    } else {
        //this is a mock household response statement 
        const fileContent = fs.readFileSync('./household.txt', 'utf-8');
        res.end(fileContent);
    }
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});