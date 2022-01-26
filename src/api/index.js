import Router from "koa-router";
import auth from './auth';
import boardRouter from './board';
import delivery from './delivery';
import shopRouter from './shop';
import authMiddleware from '../lib/authMiddleware';

const api = new Router();

//api.use
api.use('/auth', auth.routes());
api.use('/board', boardRouter.routes());
api.use('/shop', shopRouter.routes());
api.use('/delivery', delivery.routes());

export default api;