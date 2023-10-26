const express = require('express');
const router = express.Router();
const { SigupHandler, LoginHandler, DelectHandler, HeadersHandler, LogoutHandler, HomeHandler, ProductsHandler, ProductsPageHandler, DetailsPageHandler } = require('./Controller.jsx');
const { AddToCartHandler, CartHandler, DeleteCardItemsHandler, EditCardItemsHandler, DuplicateHandlersHandler, LengthHandler, OrderCompletedHandler, OrderListHandler, DeleteOrderHandler } = require('../Controller/Production_level/AddToCart.jsx');
const { GroceryMobileHandler } = require('../Controller/Grocery/Grocery.jsx');


router.get("/header", HeadersHandler);
router.post('/sigup', SigupHandler);
router.get('/login/:number/:password', LoginHandler);
router.get('/delect', DelectHandler);
router.post('/logout', LogoutHandler);
router.get('/home1', HomeHandler);
router.get('/products/:products', ProductsHandler);
router.get('/productsPage/:type', ProductsPageHandler);
router.get('/detailspage/:id', DetailsPageHandler);
router.post('/addtocart', AddToCartHandler);
router.get('/cart/:id', CartHandler);
router.post('/delete/carditems', DeleteCardItemsHandler);
router.post('/edit/carditems', EditCardItemsHandler);
router.get('/duplicateHandlers/:id/:productID', DuplicateHandlersHandler);
router.get('/length/:id', LengthHandler);
router.get('/grocerymobile', GroceryMobileHandler);
router.post('/ordersCompleted', OrderCompletedHandler);
router.get('/orderList/:ip', OrderListHandler);
router.post('/deleteOrder', DeleteOrderHandler);
module.exports = router;