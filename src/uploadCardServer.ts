import * as restify from "restify";
// const serveStatic = require("serve-static-restify");

import * as cardService from "./CardService";

// Create and start the server
const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(3131, () => {
  console.log(`Upload Card Server listen on port 3131`);
});

server.get(/\/?.*/, restify.plugins.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.post("/upload", (req, res) => {
  // console.log(req.params);
  console.log("upload card", req.body);
  cardService.set(req.body);

  console.log("change card");

  res.send({ result: true });
});

server.get("/reset", (req, res) => {
  cardService.reset();
  res.send({ result: true });
});

// test
// server.get("/echo/:name", function(req, res, next) {
//   res.send(req.params);
//   return next();
// });
