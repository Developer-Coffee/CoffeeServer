import Router from 'koa-router';
import * as shopCtrl from './shop.ctrl';

const shopRouter = new Router();

shopRouter.get('/menu', shopCtrl.menu);
shopRouter.get('/list', shopCtrl.list);
shopRouter.post('/create', shopCtrl.create);
shopRouter.post('/addMenu', shopCtrl.addMenu);

export default shopRouter;
