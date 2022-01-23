import Joi from 'joi';
import User from '../../models/user';
import axios from 'axios';

export const login = async ctx => {
  const {access_token} = ctx.request.body;
  console.log(access_token);
  let kakaoUid, kakaoNickname, kakaoProfileImg, kakaoThumbnailImg;
  await axios({
    url: "https://kapi.kakao.com/v2/user/me",
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    method: 'POST'
  }).then(response => {
    console.log(response.data);
    kakaoUid = response.data.id;
    kakaoNickname = response.data.kakao_account.profile.nickname;
    kakaoProfileImg = response.data.kakao_account.profile.profile_image_url;
    kakaoThumbnailImg = response.data.kakao_account.profile.thumbnail_image_url;
  }).catch(error => {
    console.log(error.response);
    return;
  })

  try {
    const exists = await User.findByKakaoUid(kakaoUid);
    if (exists) {
      const login_token = exists.generateToken();
      ctx.cookies.set('login_token', login_token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7days
        httpOnly: true,
      });
      return;
    } else {
      const user = new User({
        kakaoUid, kakaoNickname, kakaoProfileImg, kakaoThumbnailImg,
      });
      console.log(user.serialize());
      await user.save();
      const login_token = user.generateToken();
      ctx.cookies.set('login_token', login_token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7days
        httpOnly: true,
      });
      return;
    }
  } catch (e) {
    console.log("error on login: " + e.toString());
    ctx.throw(500, e);
  }
}