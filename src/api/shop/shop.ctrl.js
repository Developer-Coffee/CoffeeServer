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
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[가-힣|a-z|A-Z|0-9|\s]+$/)
      .required(),
    optionCategories: Joi.array().items(
      Joi.object({
        categoryName: Joi.string()
          .min(1)
          .max(10)
          .pattern(/^[가-힣|a-z|A-Z|0-9|\s|(|)]+$/)
          .required(),
        options: Joi.array().items({
          optionName: Joi.string()
            .min(1)
            .max(10)
            .pattern(/^[가-힣|a-z|A-Z|0-9]+$/)
            .required(),
          optionPrice: Joi.number()
            .required(),
        }).required(),
      })
    ).required(),
    basicPrice: Joi.number().positive().required(),
    shop: Joi.string().required(),
    menuImgUrl: Joi.string(),
  })

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const {name, optionCategories, basicPrice, shop} = ctx.request.body;
    let {menuImgUrl} = ctx.request.body;
    const shopExists = await Shop.findById(shop);
    if (!shopExists) {
      ctx.status = 400;
      ctx.body = result.error;
      return;
    }

    if(!menuImgUrl) menuImgUrl = "https://www.twosome.co.kr/resources/images/content/img_p_coffeestory.jpg";

    const menuItem = new MenuItem({
      name, optionCategories, basicPrice, shop, menuImgUrl,
    });
    await menuItem.save()
    ctx.body = menuItem.serialize();
    //TODO
  } catch (e) {
    ctx.throw(500, e);
  }
}

export const list = async ctx => {
  try {
    ctx.body = await Shop.find();
  } catch (e) {
    ctx.throw(500, e);
  }
}