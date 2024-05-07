import { faker } from '@faker-js/faker';

class ProductMock{
    constructor(){
        this.title= faker.commerce.productName()
        this.description= faker.commerce.productDescription(),
        this.code= faker.commerce.isbn(),
        this.price= faker.commerce.price(),
        this.status=true,
        this.stock= faker.number.int(),
        this.category= faker.commerce.productAdjective(),
        this.thumbnails= faker.image.urlLoremFlickr({ category: "products"}),
        this._id= faker.database.mongodbObjectId()
    }
}
export const generateMockProduct = () =>{
    try {
        return new ProductMock()
    } catch (error) {
        console.log(error)
    }
}
export const generateMockProducts = (amountProducts=100) =>{
    let products = []

    for (let i = 0; i < amountProducts; i++) {
        products.push(generateMockProduct());
    }

    return products
}




