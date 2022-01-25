import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';
import authMiddleware from '../../lib/authMiddleware';

const auth = new Router();

auth.use(authMiddleware);
auth.post('/login', authCtrl.login);
auth.get('/logout', authCtrl.logout);
auth.get('/info', authCtrl.info);
auth.get('/pickup', authCtrl.pickup);


export default auth;