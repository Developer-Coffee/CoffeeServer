import Joi from 'joi';
import User from '../../models/user';
import axios from 'axios';

export const login = async ctx => {
  const {access_token} = ctx.request.body;
  console.log(access_token);

  await axios({
    url: "https://kapi.kakao.com/v1/user/me",
    headers: {
      'Authorization': `KakaoAK ${access_token}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    method: 'POST'
  }).then(response => {
    console.log(response.data);
  })

  ctx.body = "gotit!";
  return;
}