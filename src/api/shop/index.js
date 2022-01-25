import Router from 'koa-router';
import * as shopCtrl from './shop.ctrl';

const shop = new Router();

shop.get('/menu', shopCtrl.menu);
shop.get('/list', shopCtrl.list);
shop.post('/create', shopCtrl.create);
shop.post('/addMenu', shopCtrl.addMenu);

export default shop;
