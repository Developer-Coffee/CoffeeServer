import Router from 'koa-router';
import * as deliveryCtrl from './delivery.ctrl';
import authMiddleware from '../../lib/authMiddleware';
import boardRouter from '../board';

const delivery = new Router();

boardRouter.use(authMiddleware);
delivery.post('/start', deliveryCtrl.start);
delivery.post('/update', deliveryCtrl.update);

export default delivery;