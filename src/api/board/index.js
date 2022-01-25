import Router from 'koa-router';
import * as boardCtrl from './board.ctrl';

const board = new Router();

board.get('/list', boardCtrl.list);
board.get('/orders', boardCtrl.orders);
board.post('/create', boardCtrl.create);

export default board;