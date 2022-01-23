import Router from 'koa-router';
import * as authCtrl from 'auth.ctrl';

const auth = new Router();

auth.get('/login', authCtrl.login);

export default auth;