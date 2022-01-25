import Board from '../../models/board';
import Joi from 'joi';


export const list = async ctx => {
  const boards = await Board.find()
    // .populate("orderList");
  //TODO: order 구현 후 populate
  let result = [];
  for (const board of boards) {

    let menuCount = 0;
    const orderList = board.orderList;
    for (const order of orderList) {
      menuCount += order.count;
    }

    const temp = {
      shop: board.shop,
      destination: board.destination,
      menuCount,
      state: board.state,
    }

    result.push(temp);
  }
  ctx.body = result;

}

export const orders = async ctx => {
  const {groupBy, boardId} = ctx.query;
  if (!groupBy || !boardId) {
    ctx.status = 400; //Bad request
    return;
  } else if (groupBy !== "menu" && groupBy !== "user") {
    ctx.status = 400;
    return;
  } else {
    const board = await Board.findById(boardId);
    if (!board) {
    ctx.status = 400;
    return;
    }

    //TODO: shop, order & menuItem 구현 후 추가 구현 필요

  }

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
  } = ctx.request.body;
  try {
    const board = new Board({
      shop, destination,
      generatedAt: new Date(),
      state: "created",
    });
    console.log(ctx.request.body);

    await board.save();

    ctx.body = board.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
}