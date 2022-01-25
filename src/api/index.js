import Router from "koa-router";
import auth from './auth';
import board from './board';
import shop from './shop';
import delivery from './delivery';

const api = new Router();

//api.use
api.use('/auth', auth.routes());
api.use('/board', board.routes());
api.use('/shop', shop.routes());
api.use('/delivery', delivery.routes());

export default api;