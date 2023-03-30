import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import UserRoute from "./Routes/UserRoute.js";

// const express = require("express");
// const dotenv = require("dotenv");
// const db = require("./config/db.js");
// const { UserRoute } = require("./Routes/UserRoute.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(UserRoute);

export default app;
// module.export = app;
