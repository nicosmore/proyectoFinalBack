class CartDTO {
    constructor(cartItem, id){
        Object.assign(this, cartItem);
        this.createdAt = cartItem.createdAt || new Date().toISOString();  
        this.updatedAt = new Date().toISOString();
        this.user = null;
        this.shipping_address= null;
        if(id) {
            this._id = id;
        }
    }
}
module.exports = CartDTO;