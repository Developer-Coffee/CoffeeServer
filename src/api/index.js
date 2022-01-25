import Router from "koa-router";
import auth from './auth';
import board from './board';
import delivery from './delivery';
import shopRouter from './shop';

const api = new Router();

//api.use
api.use('/auth', auth.routes());
api.use('/board', board.routes());
api.use('/shop', shopRouter.routes());
api.use('/delivery', delivery.routes());

export default api;