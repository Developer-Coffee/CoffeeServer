

const authMiddleware = async (ctx, next) => {
  const { user } = ctx.state;
  if (!user) {
    console.log("no auth with token!");
    ctx.status = 401; //Unauthorized
    ctx.body = "Unauthorized!";
    return;
  }
  return next();
}

export default authMiddleware;