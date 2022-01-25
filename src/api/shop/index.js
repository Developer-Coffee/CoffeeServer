import Router from 'koa-router';
import * as shopCtrl from './shop.ctrl';

const shop = new Router();

shop.get('/menu', shopCtrl.menu);
shop.get('/list', shopCtrl.list);
shop.post('/create', shopCtrl.create);
shop.post('/addmenu', shopCtrl.addmenu);

export default shop;
