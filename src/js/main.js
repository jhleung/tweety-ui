const path = require('path');
const http = require('http');
const fs = require('fs');
const url = require("url");

const readFile = (file, res) => {
	fs.readFile(file, (err, data) => {
		if(err) {
			res.writeHead(404);
			res.write("Not Found!");
		} else {
			res.writeHead(200);
			res.write(data);
		}
		res.end();
	})
}

const server = http.createServer((req, res) => {
	const pathname = url.parse(req.url).pathname;
	if (pathname == '/')
		readFile(path.join(__dirname, '../index.html'), res);
	else if (pathname == '/main.css')
		readFile(path.join(__dirname, '../main.css'), res);
	else if (pathname == '/js/app.js') {
		readFile(path.join(__dirname, '/app.js'), res);
	}
}).listen(9000);
