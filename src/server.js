import express from 'express'
import productsRouter, { productManager } from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import rootDir from './utils/dirname.js'
import hanblebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import { dbName, password, userName } from './env.js'

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

mongoose.connect(`mongodb+srv://userTest:${password}@ecommerce.4o9gdn5.mongodb.net/${dbName}?retryWrites=true&w=majority`)
    .then(()=>{
        console.log("Base de datos conectada")
    })
    .catch((error)=>{
        console.log(error)
    })


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

