const ProductsApi = require('../api/products.api');
const CartsApi = require('../api/cart.api');
//const OrdersApi = require('../api/orders.api');


const productsApi = new ProductsApi();
const cartsApi = new CartsApi();

class RenderRoutes {

    loginRender = (req, res) => {
        const user = req.user;
        if (user){
            return res.redirect('/api/home')
        }else{
            res.render('auth/login',{
            pagina: 'Login', 
            })
        }
    };
    
    registerRender = (req, res) => {
        const user = req.user;
        if (user){
            return res.redirect('/api/home')
        }else{
            res.render('auth/register',{
                pagina: 'Registro',
            })
        }
    };
    
    homeRender = async (req, res) => {
        const allProducts = await productsApi.getProducts()    
        res.render('sections/home',{
            pagina: 'Todos los Productos',
            barra: true,
            products: allProducts,
            userId: req.user._id,
            cartId: req.user.cart
        });
    };
    
    categoriesRender = async (req, res) => {
        const { category } = req.query;
        const allProducts = await productsApi.getProductCategory(category);
        res.render('sections/home',{
            pagina: `${category}`,
            barra: true, 
            products: allProducts,
            userId: req.user._id,
            cartId: req.user.cart       
        });
    };
    
    profileRender = (req, res) => {
        const data = req.user;    
        res.render('sections/profile',{
            pagina: 'Perfil',
            barra: true,
            user: data     
        });
    };
    
    cartRender = async (req, res) => {
        const id = req.user.cart;
        const cartProducts = await cartsApi.listCartProds(id);
        console.log(cartProducts);   
        res.render('sections/cart',{
            pagina: 'Carrito',
            barra: true,
            products: cartProducts,
            userId: req.user._id,
            cartId: req.user.cart  
        });
    };
    
    logoutRender = async (req, res) => {
        const user = await req.user.name;
        try {
          req.session.destroy(err => {
            if (err) {
              console.log(err);
              res.clearCookie('my-session');
              res.redirect('sections/login')
            }
            else {
                res.clearCookie('my-session');
                res.render('sections/logout',{
                    pagina:'Logout',
                    username: user
                });
            }
          })
        }
        catch(err) {
          console.log(err);
        }
    }; 
    
    chatRender = async (req, res) => {
        const email = await req.user.email;
        res.render('sections/chat',{
            pagina:'Chat',
            barra: true,
            username: email,        
        })
    };
    
    successRender = async (req, res) => {
        const id = req.user._id;   
    
        res.render('sections/success',{        
            barra: true,        
            userId: req.user._id,
            cartId: req.user.cart  
        });
    };
}

module.exports = RenderRoutes;

