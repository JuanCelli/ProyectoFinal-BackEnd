
export const validationProduct = (product) =>{
    const {title,description,price,thumbnail,code,stock,status,category} = product
    let validation = false

    if(title && description && code && category && typeof(title==="string") && typeof(description)==="string" && typeof(price)==="number" && price >= 0 &&  typeof(thumbnail)==="string" && typeof(code)==="string" &&  typeof(stock)==="number" && stock>=0 && typeof(status)==="boolean" && typeof(category)==="string"){
        return validation = true
    }

    return validation
} 