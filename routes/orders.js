const { response } = require('express');

const ordersRouter = require('express').Router();
// const { getAllProducts, postProduct} = require('../db/products');
// const { getAllOrders, getPendingOrderByUser } = require('../db/orders');
ordersRouter.get("/", async (req, res, next) => {
    try {
    // const products = await getAllProducts();
    // const orders = await getAllOrders();
    console.log("products:", products)
    res.send({
      orders: orders
    });
  } catch (error) {
  }
});
ordersRouter.post("/", async (req, res, next) => {
    const {status, userId, datePlaced } = req.body
  try {
    const newProduct = await postProduct(status = created, userId, datePlaced);
    // const orders = await getAllOrders();
    console.log("newlyAddedProduct:", newProduct)
    req.user ? res.send({
      newProduct : newProduct
    }) : null
  } catch (error) {
  }
});
ordersRouter.get("/cart", async (req, res, next) => {
try {
  const cartToCheckout = await getPendingOrderByUser(req.user);
  // const orders = await getAllOrders();
  console.log("newlyAddedProduct:", newProduct)
  req.user ? res.send({
    cartToCheckout : cartToCheckout
  }) : null
} catch (error) {
}
});
ordersRouter.get("/users/:userId/orders", async (req, res, next) => {
  const { userId } = req.params
  try {
    const cartToCheckout = await getPendingOrdersByUser(userId);
    // const orders = await getAllOrders();
    console.log("newlyAddedProduct:", newProduct)
    req.user ? res.send({
      cartToCheckout : cartToCheckout
    }) : null
  } catch (error) {
  }
  });



module.exports = { ordersRouter };