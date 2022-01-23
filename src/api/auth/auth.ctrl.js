import Joi from 'joi';
import User from '../../models/user';

export const login = async ctx => {
  const {code} = ctx.query;
  console.log(code);
  ctx.body = "gotit!";
  ctx.url = "www.google.com";
  return;
}