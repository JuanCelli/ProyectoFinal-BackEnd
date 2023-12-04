const socket = io()


socket.emit("message","Mensaje desde cliente")

socket.on("update_products",(data)=>{
    console.log("Se ha actualizado la lista de productos")
    renderNewList(data)
})

const renderNewList = (products) =>{
    const ul = document.querySelector(".ul-container-list")
    
    ul.innerHTML = ""

    products?.forEach(product => {
        ul.innerHTML += `<li>Nombre: ${product.title} - Precio: $${product.price} - Stock: ${product.stock}</li>`
        
    });
}
renderNewList()