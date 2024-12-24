import express, { Request, Response } from "express";
import "dotenv/config";
import { connectDB } from "./config/db";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import "dotenv/config";

import terrorRouter from "./routes/terror.router";
import orgRouter from "./routes/org.router";
import CreateRouter from "./routes/create.router";
import { handelShackConnection } from "./socket/io";
import { seed } from "./service/terror.service";

const PORT = process.env.PORT || 3000;

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

app.use(cors());
connectDB();
app.use(express.json());
app.use("/api/analysis/", terrorRouter);
app.use("api/relationships/", orgRouter);
app.use("/api/postTerror", CreateRouter);

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});
// seed()
io.on("connection", handelShackConnection);
server.listen(PORT, () =>
  console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`)
);
