const Router = require("express").Router();
const authRouter = require("../routes/auth");
// const productsRouter = require("./products");
// const usersRouter = require("./users");
// const promosRouter = require("./promos");
// const transactionRoute = require("./transactions");
// const notifRouter = require("../routes/notif");

Router.use("/auth", authRouter)
// .use("/products", productsRouter)
// .use("/users", usersRouter)
// .use("/promos", promosRouter)
// .use("/transactions", transactionRoute)
// .use("/notification", notifRouter);

module.exports = Router;
