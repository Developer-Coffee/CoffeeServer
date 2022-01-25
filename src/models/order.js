import mongoose from 'mongoose';
import MenuItem from './menuItem';
const {Schema} = mongoose;

const OrderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  menuItem: {type: Schema.Types.ObjectId, ref: 'MenuItem', required: true},
  selectedOptions: [{
    categoryName: {type: Schema.Types.String, required: true},
    optionName: {type: Schema.Types.String, required: true},
  }],
  count: {type: Schema.Types.Number, required: true},
  board: {type: Schema.Types.ObjectId, ref: 'Board', required: true},
})

//methods
OrderSchema.methods.serialize = function() {
  const data = this.toJSON();
  return data;
}

OrderSchema.methods.getTotalPrice = async function() {
  const menu = await MenuItem.findById(this.menuItem);
  let totalPrice = menu.basicPrice;
  for (const selectedOption of this.selectedOptions) {
    totalPrice += menu.getOptionPrice(selectedOption.categoryName, selectedOption.optionName);
  }
  return totalPrice;
}

//statics



const Order = mongoose.model('Order', OrderSchema);
export default Order;