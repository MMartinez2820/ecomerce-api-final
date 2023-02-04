const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const options = {
    apis: [
        "./src/routes/auth.routes.js", "./src/models/users.models.js",
        "./src/routes/products.routes.js", "./src/models/products.models.js",
        "./src/routes/cart.routes.js", "./src/models/product_in_cart.models.js",
        "./src/routes/order.routes.js", "./src/models/order.models.js",
    ],
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce api",
            version: "0.0.1",
            description: "Api para aplicacion de ecommerce"
        }
    }
}


const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log(
        `La documentacion esta disponible en ${process.env.URL}:${port}/docs`
    );
};


module.exports = swaggerDocs;