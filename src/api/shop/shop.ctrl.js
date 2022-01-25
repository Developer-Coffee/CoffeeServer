import Shop from '../../models/shop';
import MenuItem from '../../models/menuItem';
import Joi from 'joi';

export const create = async ctx => {

  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(20)
      .pattern(/^[가-힣|a-z|A-Z|0-9|\s]+$/)
      .required(),
    address: Joi.string()
      .pattern(/^[가-힣|a-z|A-Z|0-9|\-|\s]+$/)
      .required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {

    const {name, address} = ctx.request.body;

    const shop = new Shop({
      name, address,
      menuList: [],
    })

    await shop.save();
    ctx.body = shop.serialize();

  } catch (e) {
    ctx.throw(500, e);
  }
}

export const menu = async ctx => {

}

export const addMenu = async ctx => {

}

export const list = async ctx => {
  try {
    ctx.body = await Shop.find();
  } catch (e) {
    ctx.throw(500, e);
  }
}