export const formatPaginationResult = (products) => {
    products.docs.length > 0 ? products.status = "success" : products.status = "error"
    products.payload = [...products.docs]

    products.hasNextPage ? products.nextLink = `http://localhost:8080/api/products?limit=${products.limit}&page=${products.page + 1}` : products.nextLink = null
    products.hasPrevPage ? products.prevLink = `http://localhost:8080/api/products?limit=${products.limit}&page=${products.page - 1}` : products.prevLink = null

    delete products.docs
    return products
}