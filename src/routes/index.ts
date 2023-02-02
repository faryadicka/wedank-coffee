const Router = require("express").Router();
const authRouter = require("../routes/auth");
const usersRouter = require("./user");
const productsRouter = require("./products");
// const promosRouter = require("./promos");
// const transactionRoute = require("./transactions");
// const notifRouter = require("../routes/notif");

Router.use("/auth", authRouter)
  .use("/user", usersRouter)
  .use("/products", productsRouter)
  // .use("/transactions", transactionRoute)
// .use("/promos", promosRouter)
// .use("/notification", notifRouter);

module.exports = Router;
