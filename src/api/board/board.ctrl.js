import Board from '../../models/board';
import Order from '../../models/order';
import Joi from 'joi';
import Shop from '../../models/shop';
import MenuItem from '../../models/menuItem';


export const state = async ctx => {
  const {boardId} = ctx.query;
  const board = await Board.findById(boardId)
    .populate('shop',{_id:1, name:1, address:1})
    .populate('orderList');
  if (!board) {
    ctx.status = 400;
    ctx.body = "Bad Request! No board match"
    return;
  }

  let menuCount = 0;
  const orderList = board.orderList;
  for (const order of orderList) {
    menuCount += order.count;
  }

  ctx.body =  {
    _id: board._id,
    shop: board.shop,
    destination: board.destination,
    menuCount,
    state: board.state,
  }
}

export const addOrder = async ctx => {
  const schema = Joi.object({
    menuItem: Joi.string().required(),
    selectedOptions: Joi.array().items({
      categoryName: Joi.string().required(),
      optionName: Joi.string().required(),
    }).required(),
    count: Joi.number().required(),
    board: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {menuItem, selectedOptions, count, board} = ctx.request.body;

  try {
    const menuExists = await MenuItem.findById(menuItem);
    if (!menuExists) {
      ctx.status = 400;
      ctx.body = "Bad Request! No menu match"
      return;
    }

    const boardExists = await Board.findById(board);
    if (!boardExists) {
      ctx.status = 400;
      ctx.body = "Bad Request! No board match"
      return;
    }

    let totalPrice = menuExists.basicPrice;
    for (const selectedOption of selectedOptions) {
      const price = menuExists.getOptionPrice(selectedOption.categoryName, selectedOption.optionName);
      if (price === -1) {
        ctx.status = 400;
        ctx.body = "Bad Request! no option category/option match";
        return;
      }
      totalPrice += price;
    }
    totalPrice *= count;

    const order = new Order({
      user: ctx.state.user._id,
      menuItem, selectedOptions, count, board
    });
    await order.save();

    await Board.updateOne(
      {_id: board},
      {
        $push: {
          orderList: order._id
        },
      });

    ctx.body = {order, totalPrice};
  } catch (e) {
    ctx.throw(500,e);
  }
}


export const list = async ctx => {
  const boards = await Board.find().populate('shop', {_id:1, name:1, address:1})
    .populate("orderList");
  let result = [];
  for (const board of boards) {

    let menuCount = 0;
    const orderList = board.orderList;
    for (const order of orderList) {
      menuCount += order.count;
    }

    const temp = {
      _id: board._id,
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

    if (groupBy === "menu") ctx.body = await Order.getGroupByMenu(boardId);
    else if (groupBy === "user") ctx.body = await Order.getGroupByUser(boardId);

  }

}

export const create = async ctx => {
  // const { user } = ctx.state;
  // if (!user) {
  //   // ????????? ?????? ??????
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
    const shopExists = await Shop.findById(shop);
    if (!shop) {
      ctx.status = 400;
      ctx.body = "Bad request! No shop match"
      return;
    }
    const board = new Board({
      shop, destination,
      generatedAt: new Date(),
      state: "created",
      orderList: [],
    });
    console.log(ctx.request.body);

    await board.save();

    ctx.body = board.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
}