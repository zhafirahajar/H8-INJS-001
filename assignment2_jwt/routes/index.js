const express = require("express");
const app = express();
const route = express.Router();
const homeController = require("../controllers/homeController");
const customerController = require("../controllers/customerController");
const orderController = require("../controllers/orderController");

route.get("/", homeController.home);
route.post("/login", homeController.login);
route.post("/customers", customerController.create);

//middleware for login
route.use(homeController.jwtMiddleware);

//order URI for registered user
route.post("/orders", orderController.create);
route.get("/orders/:id", orderController.getById);

module.exports = route;
