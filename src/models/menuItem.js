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

MenuItemSchema.methods.getOptionPrice = function(categoryName, optionName) {
  for (const category of this.optionCategories) {
    if (category.categoryName === categoryName) {
      for (const option of category.options) {
        if (option.optionName === optionName)
          return option.optionPrice;
      }
    }
  }
  return -1;
}


//statics
MenuItemSchema.statics.findByShopId = function(shop) {
  return this.find({shop});
}


const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
export default MenuItem;