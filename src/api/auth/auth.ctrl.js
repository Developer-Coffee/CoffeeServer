import Joi from 'joi';
import User from '../../models/user';

export const login = async ctx => {
  const {access_token} = ctx.body;
  console.log(access_token);
  ctx.body = "gotit!";
  return;
}