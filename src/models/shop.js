import mongoose from 'mongoose';
const {Schema} = mongoose;

const ShopSchema = new Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  menuList: [{type: Schema.Types.ObjectId, ref: 'MenuItem', required: true}],
});


//methods
ShopSchema.methods.serialize = function() {
  const data = this.toJSON();
  return data;
}


//statics



const Shop = mongoose.model('Shop', ShopSchema);
export default Shop;