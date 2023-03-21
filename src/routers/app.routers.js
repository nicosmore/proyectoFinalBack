const { Router } = require('express');

const productsRoutes = require("./products/products.routes");
const cartsRoutes = require("./carts/carts.routes");
const usersRoutes = require("./users/users.routes");
const authRoutes = require("./auth/auth.routes");
const ordersRouter = require("./orders/orders.routes")
const chatRoutes = require("./chat/chat.routes");
const buyingRoutes = require("./buying/buying.routes");
const auth = require('../middlewares/auth');

const RenderRoutes = require("../utils/render.utils");
const renderRoutes = new RenderRoutes();

const router = Router();

router.use("/products", productsRoutes);
router.use("/cart", cartsRoutes);
router.use("/user", usersRoutes);
router.use("/auth", authRoutes);
router.use("/orders", ordersRouter);
router.use("/chat", chatRoutes);
router.use("/buying", buyingRoutes);

//Render Routes
router.get("/login", renderRoutes.loginRender);
router.get("/register", renderRoutes.registerRender);
router.get("/home", renderRoutes.homeRender);
router.get("/category", renderRoutes.categoriesRender);
router.get("/profile", renderRoutes.profileRender);
router.get("/cart", renderRoutes.cartRender);
router.get('/logout', auth, renderRoutes.logoutRender);
router.get('/chat', renderRoutes.chatRender);
router.get('/success', renderRoutes.successRender);


module.exports = router;