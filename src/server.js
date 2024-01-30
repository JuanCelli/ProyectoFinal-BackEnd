import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import usersViewsRouter from './routes/usersViews.router.js'
import rootDir from './utils/dirname.js'
import hanblebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import session from 'express-session'
import { dbName, password, userName } from './env.js'
import messageModel from './daos/models/message.model.js'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import initializePassport from './passport/passport.config.js'
import passport from 'passport'



const mongoUrlDb = `mongodb+srv://userTest:${password}@ecommerce.4o9gdn5.mongodb.net/${dbName}?retryWrites=true&w=majority`
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session(
    {
        store: MongoStore.create({
            mongoUrl: mongoUrlDb,
            mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
            ttl: 60 * 10
        }),
        secret:"coderSecret",
        resave:false,
        saveUninitialized:true
    }
))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/products",productsRouter)
app.use("/api/carts",cartRouter)
app.use("/api/sessions",sessionsRouter)
app.use("/",viewsRouter)
app.use("/users",usersViewsRouter)

app.use(express.static(`${rootDir}/../public`))




app.engine(`hbs`,hanblebars.engine({
    extname: `hbs`,
    defaultLayout: `main.hbs`,
    allowProtoPropertiesByDefault: true
}))

app.set("view engine","hbs")
app.set(`views`,`${rootDir}/views`)


const PORT = 8080
const httpServer = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const socketServer = new Server(httpServer)

mongoose.connect(mongoUrlDb)
    .then(()=>{
        console.log("Base de datos conectada")
    })
    .catch((error)=>{
        console.log(error)
    })




socketServer.on("connection",(socketClient)=>{
    console.log("Nuevo usuario conectado")

    socketClient.on("message", async (data)=>{
        try {
            const newMessage = await messageModel.create(data)
            updateMessagesToClient()

        } catch (error) {
            console.log(error)
        }
    })

    updateMessagesToClient()
})

export const updateMessagesToClient = async () =>{
    try {
        const message = await messageModel.find()
        socketServer.emit("update_messages",message)
    } catch (error) {
        console.log(error)
    }

}
