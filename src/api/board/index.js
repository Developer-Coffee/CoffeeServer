import Router from 'koa-router';
import * as boardCtrl from './board.ctrl';
import authMiddleware from '../../lib/authMiddleware';

const boardRouter = new Router();

boardRouter.use(authMiddleware);
boardRouter.post('/addOrder', boardCtrl.addOrder);
boardRouter.get('/list', boardCtrl.list);
boardRouter.get('/orders', boardCtrl.orders);
boardRouter.post('/create', boardCtrl.create);
boardRouter.get('/state', boardCtrl.state);

export default boardRouter;