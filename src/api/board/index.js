import Router from 'koa-router';
import * as boardCtrl from './board.ctrl';

const boardRouter = new Router();

boardRouter.post('/addOrder', boardCtrl.addOrder);
boardRouter.get('/list', boardCtrl.list);
boardRouter.get('/orders', boardCtrl.orders);
boardRouter.post('/create', boardCtrl.create);
boardRouter.get('/state', boardCtrl.state);

export default boardRouter;