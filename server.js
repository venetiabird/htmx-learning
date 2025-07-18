const http = require('http')
const fs = require('fs');
const path = require('path');
const { URLSearchParams } = require('url');

const port = 3000;

const server = http.createServer((req, res) => { 
    if(req.url.startsWith("/change-color")) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const colourClass = url.searchParams.get("colour") || "";
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(`<div id="response-wrapper" class="${colourClass}"><div id="response"</div>
            </div>`)
    } else if(req.method === "GET" && req.url === "/data") {
        const filePath = path.join(__dirname, 'data.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(data)
        })
    
    } else if(req.method === "GET" && req.url === "/") {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(data)
        });
    } else if(req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk
        })
        
        req.on("end", () => {
            const params = new URLSearchParams(body);
            const parsedData = Object.fromEntries(params.entries());

            res.writeHead(200, {
                "Content-Type": "application/html"
            });
            // res.end(JSON.stringify({message: `hello ${parsedData.name}!!`}));
            res.end(`<p>Hello ${parsedData.name}!!</p>`)
        });
    }
});

server.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
})