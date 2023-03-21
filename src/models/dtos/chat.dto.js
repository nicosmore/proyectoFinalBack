class OrderDTO {
    constructor(ChatItem, id, ){
        Object.assign(this, ChatItem);
        this.createdAt = ChatItem.createdAt || new Date().toISOString();
        this.updatedAt = new Date().toISOString();
        this.type= null;                       
        if(id) {
            this._id = id;
        }
    }
}
module.exports = OrderDTO;