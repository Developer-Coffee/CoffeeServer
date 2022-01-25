require('dotenv').config();
import jwtMiddleware from './lib/jwtMiddleware';
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";
import api from "./api";
import logger from "koa-logger";
import IO from "koa-socket-2";

const app = new Koa();
const io = new IO();
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
app.use(jwtMiddleware);

// set router
app.use(router.routes()).use(router.allowedMethods());

// socket io attach
io.attach(app);

io.on('connect', (ctx, data) => {
  console.log('client sent data to message endpoint', data);
});

app.listen(PORT, () => {
  console.log("Listening to port 80");
});