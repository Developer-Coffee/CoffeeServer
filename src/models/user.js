import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const {Schema} = mongoose;
const UserSchema = new Schema({
  kakaoUid: {type: String, required: true},
  kakaoNickname: {type: String, required: true},
  phone: {type: String, required: true}
});


UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  return data;
};


UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    //첫 번쨰 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣는다.
    {
      _id: this.id,
      kakaoUid: this.kakaoUid,
    },
    process.env.JWT_SECRET, //두 번째 파라미터는 JWT 암호
    {
      expiresIn: '7d', //7일 동안 유효
    },
  );
  return token;
}

const User = mongoose.model('User', UserSchema);
export default User;