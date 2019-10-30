const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const morgan = require("morgan");
const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

function gateKeeper(req, res, next) {
  const password = req.headers.password;
  !password
    ? res.status(400).json({ message: "please provide a password" })
    : password.toLowerCase() === "mellon"
    ? next()
    : res.status(401).json({ you: "cannot pass!!" });
}

server.use(helmet());
server.use(gateKeeper);
server.use(express.json());
server.use(morgan("dev"));

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
