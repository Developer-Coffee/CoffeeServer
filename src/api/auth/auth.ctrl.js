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
    console.log(kakaoUid);
    console.log(kakaoNickname);
    console.log(kakaoProfileImg);
    console.log(kakaoThumbnailImg);
  }).catch(error => {
    console.log(error.response);
    ctx.body = {success: false};
    ctx.throw(500, error);
  })

  console.log("test");
  try {
    const exists = await User.findByKakaoUid(kakaoUid);
    if (exists) {
      console.log("user exists: make jwt");
      const login_token = exists.generateToken();
      ctx.cookies.set('login_token', login_token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7days
        httpOnly: true,
      });
      const userInfo = exists.serialize();
      ctx.body = { login_token, userInfo, success: true };
    } else {
      console.log("no user exists: create new");
      const user = new User({
        kakaoUid, kakaoNickname, kakaoProfileImg, kakaoThumbnailImg,
        currentPoint: 0,
        totalEarn: 0,
      });
      await user.save();
      const login_token = user.generateToken();
      ctx.cookies.set('login_token', login_token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7days
        httpOnly: true,
      });
      const userInfo = user.serialize();
      ctx.body = { login_token, userInfo, success:true };
    }
  } catch (e) {
    console.log("error on login: " + e.toString());
    ctx.body = {success: false};
    ctx.throw(500, e);
  }
}

export const logout = async ctx => {
  ctx.cookies.set("login_token");
  ctx.status = 204;
}

export const info = async ctx => {
  const {userId} = ctx.query;
  const result = await User.findById(userId);
  ctx.body = result.serialize();
}

export const pickup = async ctx => {
  ctx.body = "pickup";
  //TODO: on Board delivery start
}