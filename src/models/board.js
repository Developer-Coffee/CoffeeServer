import mongoose from 'mongoose';
const {Schema} = mongoose;

const BoardSchema = new Schema({
  shop: {type: Schema.Types.ObjectId, ref: 'Shop', required: true},
  destination: {type: Schema.Types.String, required: true},
  generatedAt: {type: Schema.Types.Date, required: true},
  orderList: [{type: Schema.Types.ObjectId, ref: 'Order', required: true}],
});

//methods


//statics



const Board = mongoose.model('Board', BoardSchema);
export default Board;