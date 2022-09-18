const orderController = require("../controller/order.controller");
const {authJwt, validateOrder} = require("../middleware")
const {vaildateOrder} = require("../middleware");

module.exports = (app) => {

    //create orders
    app.post("/foodDeliveryApp/api/v1/orders",[authJwt.verifyToken] ,orderController.create);

    //Get all orders
    app.get("/foodDeliveryApp/api/v1/orders/:id",[authJwt.verifyToken, authJwt.isAdminOrOwnerOfOrder] ,orderController.getAllOrders);

    //Update order
    app.put("/foodDeliveryApp/api/v1/orders",[authJwt.verifyToken] ,orderController.update);
}