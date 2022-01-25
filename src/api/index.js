import Router from "koa-router";
import auth from './auth';
import board from './board';

const api = new Router();

//api.use
api.use('/auth', auth.routes());
api.use('/board', board.routes());


export default api;