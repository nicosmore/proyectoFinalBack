**Proyecto Final**
**Alumno: Nicolas Moreira**

**Crear .env antes de ejecutar**
    - NODE_ENV="development"
    - PORT=8080
    - DB_NAME="entregaFinal"
    - DB_PASSWORD="Elfacha4374"
    - DATASOURCE="mongo"
    - SESSION_SECRET="top-secret-51"
    - TEST_MAIL="kade.murray@ethereal.email"
    - PASSWORD_MAIL="wDagthBqgMB6SFzhqy"

**Routes**

**""/""** 
    - GET Muestra datos del servidor

**"/api/products"**
    - POST "/" ingreso de products por body (name, description, code, image, price, category, stock)

    - GET "/:Id" buca product por id

    - GET "/category/:category" busca product por category

    - GET "/" trae todos los products

    - PUT "/:Id" actualiza product por id

    - DELETE "/:Id" borra product por id

**"/api/auth"**
    - POST "/register" registro de user por body (name, lastname, phone, email, password, confirm_password)

    - POST "/login" ingreso de user ya registrado por body (email, password)
        

**"/api/cart"**
    - POST "/" crea cart

    - DELETE "/:Id" borra cart por id

    - GET "/:Id/products" lista todos los products de cart

    - POST "/:IdCar/:IdProd" agrega products a cart por sus id

    - PUT "/:IdCar/:IdProd" elimina product del cart por su id

    - PUT "qty/:IdCar/:IdProd" resta 1 a qty de product en cart

**"/api/user"**
    - GET "/:Id" buca user por id

    - PUT "/:Id" actualiza user por id

**"/api/chat"**
    - POST "/" guarda messages de chat

    - GET "/:Email" busca los messages por email

**"/api/orders"**
    - POST "/:IdUser/:IdCart" crea order por los id 

    - DELETE "/:Id" Borra order por id

    - GET "/:Id" busca order por id

    - GET "/list/:IdUser" lista orders de user por sus id

