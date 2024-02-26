export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getUserByEmail = (email) => {
        return this.dao.getUserByEmail(email);
    }

    getUserById = (id) => {
        return this.dao.getUserById(id);
    }

    createUser = (data) => {
        return this.dao.createUser(data);
    }

    updateProduct = (id, newProduct) => {
        return this.dao.updateProduct(id, newProduct);
    }

    deleteProduct = (id) => {
        return this.dao.deleteProduct(id);
    }
}