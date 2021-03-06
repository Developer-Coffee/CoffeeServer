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

OrderSchema.methods.getPricePerOne = async function() {
  const menu = await MenuItem.findById(this.menuItem);
  let pricePerOne = menu.basicPrice;
  for (const selectedOption of this.selectedOptions) {
    pricePerOne += menu.getOptionPrice(selectedOption.categoryName, selectedOption.optionName);
  }
  return pricePerOne;
}

//statics
OrderSchema.statics.getGroupByUser = async function(board) {

  const orders = await Order.find({board}).populate('menuItem');
  let result = [];
  for (const order of orders) {
    let found = false;
    let combinedName = order.menuItem.name;
    for (const option of order.selectedOptions) {
      combinedName = combinedName + " " + option.optionName;
    }
    for (const item of result) {
      if (item.user._id.equals(order.user._id)) {
        found = true;

        item.orders.push({
          combinedName,
          count: order.count,
          pricePerOne: await order.getPricePerOne(),
        });
      }
    }
    if (!found) {
      result.push({
        user: order.user,
        orders: [{
          combinedName,
          count: order.count,
          pricePerOne: await order.getPricePerOne(),
        }]
      });
    }
  }
  return result;
  /*
  {
    user: user._id
    orders: [{
      combinedName: "name-option1-option2",
      count,
      pricePerOne
    }, ...]
  }
  */
}

OrderSchema.statics.getGroupByMenu = async function(board) {
  const orders = await Order.find({board}).populate('menuItem');
  let result = [];
  for (const order of orders) {
    let found = false;
    let combinedName = order.menuItem.name;
    for (const option of order.selectedOptions) {
      combinedName = combinedName + " " + option.optionName;
    }
    for (const item of result) {
      if (item.combinedName === combinedName) {
        for (const orderId of item.orderIds){
          if (orderId.user._id.equals(order.user._id)){
            found = true;
            orderId.count += order.count;
          }
        }
        if (!found) {
          item.orderIds.push({user: order.user, count: order.count});
        }
        item.count = item.count + order.count;
        found = true;
      }
    }
    if (!found) {
      result.push({
        combinedName,
        count: order.count,
        pricePerOne: await order.getPricePerOne(),
        orderIds: [{user: order.user, count: order.count}],
      });
    }
  }
  return result;
  /*
    {
      combinedName: "name-option1-option2",
      count,
      pricePerOne,
      orderIds: []
    }
     */
}


const Order = mongoose.model('Order', OrderSchema);
export default Order;