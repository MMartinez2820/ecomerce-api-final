const authRoutes = require("./auth.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");
const productsRoutes = require("./products.routes");

const routerApi = (app) => {
    app.use("/auth", authRoutes);
    app.use("/products", productsRoutes);
    app.use("/cart", cartRoutes);
    app.use("/order", orderRoutes);
};

module.exports = routerApi;