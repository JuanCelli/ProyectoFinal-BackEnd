export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getProducts = (limit = 10, page = 1, query, sort) => {
        return this.dao.getProducts(limit = 10, page = 1, query, sort);
    }

    getProductById = (id) => {
        return this.dao.getProductById(id);
    }

    createProduct = (product) => {
        return this.dao.createProduct(product);
    }

    updateProduct = (id, newProduct) => {
        return this.dao.updateProduct(id, newProduct);
    }
    updateThumbnails = (id, fileReference) => {
        return this.dao.updateThumbnails(id, fileReference);
    }

    deleteProduct = (id) => {
        return this.dao.deleteProduct(id);
    }
}