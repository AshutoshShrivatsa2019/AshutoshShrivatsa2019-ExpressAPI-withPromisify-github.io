const http=require("http");
const myapp=require("./myapp");

const port = process.env.PORT || 3001;

const server=http.createServer(myapp);

server.listen(port);