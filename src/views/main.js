const socket = io();

//---CHAT---
const formMessages = document.getElementById('formMessages');

if(formMessages){
    
    formMessages.addEventListener('submit', (e) =>{
        e.preventDefault();
        const messageImput = document.getElementById('message');
        const email = e.target.querySelector('p').textContent;
        const message = messageImput.value;
        const newMessage = {email, message}        
        
        socket.emit('newMessage', newMessage);
    })


socket.on('chatMessage', (data) =>{
    const email = document.querySelector('p').textContent;
    const message = data.msj;
    const time = data.date

    socket.on('userDisconnected', () =>{ 
        let renderMsgDisc = `<p style="color: red"><b>User: ${email} disconnect</b></p>`;
        document.getElementById("msg").innerHTML = renderMsgDisc
    });

    let renderMsgChat = ` <p style="padding-top: 0.3rem"><b>
                        <span style="color: blue">${email}</b></span> 
                        <span style="color: brown">${time}</span> 
                        <span style="color:green"><i>${message}</i></span></p>`;

    document.getElementById("msg").innerHTML += renderMsgChat
}) 
 
}



//------PRODUCTS--------------------------------

const idCart = document.getElementById('cart').getAttribute('data-id');
const listaProds = document.getElementById('listaProds');
if (listaProds) {
    cargarEventListeners();
}

function cargarEventListeners () {
    listaProds.addEventListener('click', agregarProducto);    
}
 
function agregarProducto(e){
    e.preventDefault();      
    const idProd = e.target.getAttribute('data-id')
    const funcion = e.target.getAttribute('funcion')

    switch (funcion) {
        case "add":
            addProd(idCart, idProd);
            break;
        case "subtract":
            subtractProd(idCart, idProd);            
            break;
        case "delete":
            deleteProd(idCart, idProd);
            break;
    
        default:
            break;
    }
};

const addProd = async (idCart, idProd) =>{
    const result = await fetch(`http://localhost:8080/api/cart/${idCart}/${idProd}`, {
        method: 'POST',    
    })
    .then(data => {return console.log(data)});
}

const subtractProd = async (idCart, idProd) =>{
    const result = await fetch(`http://localhost:8080/api/cart/qty/${idCart}/${idProd}`, {
        method: 'PUT',    
    })
    .then(data => {return console.log(data)});
}

const deleteProd = async (idCart, idProd) =>{
    await fetch(`http://localhost:8080/api/cart/${idCart}/${idProd}`, {
        method: 'PUT',    
    })
    .then(data => {return console.log(data)});
}

//---CART---

