class OrderDTO {
    constructor(OrderItem, id, ){
        Object.assign(this, OrderItem);
        this.createdAt = OrderItem.createdAt || new Date().toISOString();  
        this.updatedAt = new Date().toISOString();        
        if(id) {
            this._id = id;
        }
    }
}
module.exports = OrderDTO;