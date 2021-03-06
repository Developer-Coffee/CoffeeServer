import mongoose from 'mongoose';
import User from './user';
const {Schema} = mongoose;

const BoardSchema = new Schema({
  // shop: {type: Schema.Types.ObjectId, ref: 'Shop', required: true},
  shop: {type: Schema.Types.ObjectId, ref: 'Shop', required: true},
  destination: {type: Schema.Types.String, required: true},
  generatedAt: {type: Schema.Types.Date, required: true},
  orderList: [{type: Schema.Types.ObjectId, ref: 'Order', required: true}],
  arrival: {type: Schema.Types.Date, required: false},
  waitFor: {type: Schema.Types.Number, required: false},
  message: {type: Schema.Types.String, required: false},
  pickLocation: {type: Schema.Types.String, requierd: false},
  deliverUser: {type: Schema.Types.ObjectId, ref: 'User', required: false},
  state: {type: Schema.Types.String, required: true},
});

//methods
BoardSchema.methods.serialize = function() {
  const data = this.toJSON();
  return data;
}

//statics



const Board = mongoose.model('Board', BoardSchema);
export default Board;