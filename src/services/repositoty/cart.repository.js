export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getCartById = (id) => {
        return this.dao.getCartById(id);
    }

    createCart = (owner) => {
        return this.dao.createCart(owner);
    }

    addProductToCart = (id, pid) => {
        return this.dao.addProductToCart(id, pid);
    }

    updateCart = (id, products) => {
        return this.dao.updateCart(id, products);
    }

    incrementProductInCart = (id, pid) => {
        return this.dao.incrementProductInCart(id, pid);
    }

    updateQualityProductInCart = (id, pid,newQuality) => {
        return this.dao.updateQualityProductInCart(id, pid,newQuality);
    }

    deleteCart = (id) => {
        return this.dao.deleteCart(id);
    }

    deleteProductFromCart = (id, pid) => {
        return this.dao.deleteProductFromCart(id, pid);
    }

    deleteAllProductFromCart = (id) => {
        return this.dao.deleteAllProductFromCart(id);
    }
    getCartByOwner = (email) => {
        return this.dao.getCartByOwner(email);
    }
}