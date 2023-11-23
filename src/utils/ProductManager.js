import fs from 'fs';

class ProductManager{
    #pathFile = "src/data/products.json"

    constructor(){
        this.products = this.readFile(this.#pathFile)
    }

    addProduct(product){
        this.products.push(product)
        this.saveFile()
    }

    deleteProduct(id){
        this.products = this.products.map((product) => {
            if(product.id === id){
                product.status = false 
                return product
            }else{
                return product
            }
        })
        this.saveFile()
    }
    getProducts (){
        return this.products.filter(product=>product.status)
    }

    getProductById(id){
        return this.products.find(product => product.id ===id && product.status)
    }

    updateProduct(id, newProduct){
        this.products = this.products.map(product => product.id === id ? {id:product.id,...product, ...newProduct} : product)
        this.saveFile()
    }

    async saveFile(){
        try{
            if(this.products.length===0){
                await fs.promises.unlink(this.#pathFile)
            }else{
                await fs.promises.writeFile(this.#pathFile, JSON.stringify(this.products, null,"\t"))
                console.log("Las modificaciones han sido guardadas")
            }
        }catch(error){
            console.log(error)
        }
    }

    readFile(path){
        if(fs.existsSync(path)){
            try{
                return JSON.parse(fs.readFileSync(path, "utf-8"))
            }catch{
                return []
            }
        }else{
            return [];
        }
    }
}

export default ProductManager

