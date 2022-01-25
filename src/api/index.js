import Router from "koa-router";
import auth from './auth';
import board from './board';
import shop from './shop';

const api = new Router();

//api.use
api.use('/auth', auth.routes());
api.use('/board', board.routes());
api.use('/shop', shop.routes());

export default api;