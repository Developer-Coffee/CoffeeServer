import mongoose from 'mongoose';
const {Schema} = mongoose;

const MenuItemSchema = new Schema({
  name: {type: String, required: true},
  optionCategories: [{
    categoryName: {type: Schema.Types.String, required: true},
    options: [{
      optionName: {type: Schema.Types.String, required: true},
      optionPrice: {type: Schema.Types.Number, required: true},
    }]
  }],
  basicPrice: {type: Schema.Types.Number, required: true},
  shop: {type: Schema.Types.ObjectId, ref: 'Shop', required: true},
  menuImgUrl: {type: Schema.Types.String, required: false},
});

//methods
MenuItemSchema.methods.serialize = function() {
  const data = this.toJSON();
  return data;
}


//statics



const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
export default MenuItem;