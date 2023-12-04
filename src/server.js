import express from 'express'
import productsRouter, { productManager } from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import rootDir from './utils/dirname.js'
import hanblebars from 'express-handlebars'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)
app.use("/",viewsRouter)

app.use(express.static(`${rootDir}/public`))


app.engine(`hbs`,hanblebars.engine({
    extname: `hbs`,
    defaultLayout: `main.hbs`,
}))

app.set("view engine","hbs")
app.set(`views`,`${rootDir}/views`)


const PORT = 8080
const httpServer = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const socketServer = new Server(httpServer)
    
socketServer.on("connection",(socketClient)=>{
    console.log("Nuevo usuario conectado")
    
    socketClient.on("message", (data)=>{
        console.log(data)
    })

    updateProductsToClient()
    
})
export const updateProductsToClient = () =>{
    socketServer.emit("update_products",productManager.getProducts())
}

