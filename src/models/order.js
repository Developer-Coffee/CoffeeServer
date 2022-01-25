import mongoose from 'mongoose';
const {Schema} = mongoose;

const OrderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  orderedMenuList: [{
    menuItem: {type: Schema.Types.ObjectId, ref: 'MenuItem', required: true},
    selectedOptions: [{
      categoryName: {type: Schema.Types.String, required: true},
      optionName: {type: Schema.Types.String, required: true},
      optionPrice: {type: Schema.Types.Number, required: true},
    }],
    count: {type: Schema.Types.Number, required: true},
  }],
  board: {type: Schema.Types.ObjectId, ref: 'Board', required: true},
})

//methods


//statics



const Order = mongoose.model('Order', OrderSchema);
export default Order;