export const generateProductCreateErrorInfo = (product) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas.
        Lista de propiedades requeridas:
            -> title: type String, recibido: ${product.title}
            -> description: type String, recibido: ${product.description}
            -> code: type String, unique, recibido: ${product.code}
            -> price: type Number, recibido: ${product.price}
            -> stock: type Number, recibido: ${product.stock}
            -> category: type String, recibido: ${product.category}
            -> thumbnails: type String, not required recibido: ${product.thumbnails}
    `;
};