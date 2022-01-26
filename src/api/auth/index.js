import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/login', authCtrl.login);
auth.get('/logout', authCtrl.logout);
auth.get('/info', authCtrl.info);
auth.get('/pickup', authCtrl.pickup);


export default auth;