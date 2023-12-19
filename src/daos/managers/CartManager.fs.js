import fs from 'fs';

class CartManager {
    #pathFile = "src/data/cart.json"

    constructor(){
        this.carts = this.readFile(this.#pathFile)
    }

    getCarts (){
        return this.carts.filter(cart=>cart.status)
    }
    getAllCarts (){
        return this.carts
    }


    getCartById(id){
        return this.carts.find(cart => cart.id ===id && cart.status)
    }

    addCart(cart){
        this.carts.push(cart)
        this.saveFile()
    }

    deleteCart(id){
        this.carts = this.carts.map((cart) => {
            if(cart.id === id){
                cart.status = false 
                return cart
            }else{
                return cart
            }
        })
        this.saveFile()
    }

    updateCart(id, pid){
        const products = this.getCartById(id).products
        const product = products.find(product=>product.id===pid)

        if(!product){
            products.push({id:pid,quality:1})
        }else{
            product.quality ++
        }

        this.saveFile()
    }

    async saveFile(){
        try{
            if(this.carts.length===0){
                await fs.promises.unlink(this.#pathFile)
            }else{
                await fs.promises.writeFile(this.#pathFile, JSON.stringify(this.carts, null,"\t"))
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

export default CartManager