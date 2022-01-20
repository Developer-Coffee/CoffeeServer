require('dotenv').config();

import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";
import api from "./api";
import logger from "koa-logger";

const app = new Koa();
const router = new Router();

const {PORT, MONGO_URI} = process.env;

mongoose.connect(MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch(e => {
  console.error(e);
});

// build router
router.use('/api', api.routes());

// set middleware
app.use(logger());
app.use(bodyParser());

// set router
app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, () => {
  console.log("Listening to port 80");
});