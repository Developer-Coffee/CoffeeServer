import Joi from 'joi';
import User from '../../models/user';
import axios from 'axios';

export const login = async ctx => {
  const {access_token} = ctx.request.body;
  console.log(access_token);

  await axios({
    url: "http://kapi.kakao.com/v1/user/access_token_info",
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    method: 'get'
  }).then(response => {
    console.log("response: " + response.data.toString());
  })

  ctx.body = "gotit!";
  return;
}