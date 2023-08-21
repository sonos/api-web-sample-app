const http = require('http');
const { url } = require('inspector');
const { readFile } = require('fs/promises')

const hostname = '127.0.0.1'
const port = 8090
/**
 * Returns the content of the given file `path` as a string.
 * @param {String} path
 * @returns {String}
 */
function content(path) {  
    return readFile(path, 'utf8')
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    if(req.url.includes('groups'))
    {
        content('./group.txt');
    } else {
        //this is a mock household response statement 
        res.end("{\n \t \"households\": [\n \t \t {\n \t \t \t \"id\": \"Sonos_iHJBfvUzznmHiuYmP2aT18usVp.NoCK8hTDBL4BUwR8k2Fe\", \n \t \t \t \"name\": null, \n \t \t \t \"ownerLuid\": \"364896036\" \n \t \t } \n \t ] \n }");
    }
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});