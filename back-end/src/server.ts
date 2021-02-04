import express from "express";
import "express-async-errors";
import "./database/connection";
import routes from "./routes";
import errorHandler from "./errors/handler";
import path from "path";
import * as cors from "cors";
const app = express();
app.use(express.json());

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

app.use(cors.default(options));
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

app.listen(3333);
