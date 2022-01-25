import Board from '../../models/board';
import Joi from 'joi';


export const list = async ctx => {
  ctx.body = await Board.find();
}

export const orders = async ctx => {

}

export const create = async ctx => {
  // const { user } = ctx.state;
  // if (!user) {
  //   // 로그인 상태 아님
  //   ctx.status = 401;
  //   return;
  // }

  console.log('create Board');
  const schema = Joi.object({
    shop: Joi.string().required(),
    destination: Joi.string().required(),
    generatedAt: Joi.date().required(),
    orders: [{
      menuName: Joi.string().required(),
      selectedOptions: [{
        categoryName: Joi.string().required(),
        optionName: Joi.string().required(),
        optionPrice: Joi.number().required(),
      }],
      count: Joi.number().required(),
    }],
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    shop,
    destination,
    generatedAt,
  } = ctx.request.body;
  try {
    const board = new Board({
      shop, destination, generatedAt
    });
    console.log(ctx.request.body);

    await board.save();

    ctx.body = board.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }


}

export const state = async ctx => {
  const { user } = ctx.state;
  if (!user) {
    // 로그인 상태 아님
    ctx.status = 401;
    return;
  }


}