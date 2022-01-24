import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('login_token');
  if (!token) {
    console.log("no token available!");
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, null, null);
    ctx.state.user = {
      _id: decoded._id,
      kakaoUid: decoded.kakaoUid,
    };

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set('login_token', token, {
        maxAge: 1000* 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    console.log("token verification failed");
    return next();
  }
}

export default jwtMiddleware;