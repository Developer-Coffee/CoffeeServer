import Router from 'koa-router';
import * as deliveryCtrl from './delivery.ctrl';

const delivery = new Router();

delivery.post('/start', deliveryCtrl.start);
delivery.post('/update', deliveryCtrl.update);

export default delivery;