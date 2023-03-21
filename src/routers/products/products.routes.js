const { Router } = require('express');
const ProductsControllers = require('../../controllers/products.controller');

const router = Router();

const productsController = new ProductsControllers();

router.get('/', productsController.getProducts);
router.get('/:Id', productsController.getProductById);
router.get('/category/:category', productsController.getProductCategory);
router.post('/', productsController.createProduct);
router.put('/:Id', productsController.updateProduct);
router.delete('/:Id', productsController.deleteProduct);

module.exports = router;