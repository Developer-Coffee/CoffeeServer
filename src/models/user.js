import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const {Schema} = mongoose;
const UserSchema = new Schema({
  kakaoUid: {type: Number, required: true},
  kakaoNickname: {type: String, required: true},
  kakaoProfileImg: {type: String, required: true},
  kakaoThumbnailImg: {type: String, required: true},
  currentPoint: {type: Number, required: true},
  totalEarn: {type: Number, required: true}
});


UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.kakaoUid;
  return data;
};


UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    //첫 번쨰 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣는다.
    {
      _id: this._id,
      kakaoUid: this.kakaoUid,
    },
    process.env.JWT_SECRET, //두 번째 파라미터는 JWT 암호
    {
      expiresIn: '7d', //7일 동안 유효
    },
  );
  return token;
}


UserSchema.statics.findByKakaoUid = function(kakaoUid) {
  return this.findOne({kakaoUid});
};

const User = mongoose.model('User', UserSchema);
export default User;