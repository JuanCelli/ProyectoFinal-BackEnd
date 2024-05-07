import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import loggersRouter from './routes/loggers.router.js'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import userRouter from './routes/users.router.js'
import usersViewsRouter from './routes/usersViews.router.js'
import filesRouter from './routes/files.router.js'
import rootDir from './utils/dirname.js'
import hanblebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import initializePassport from './passport/passport.config.js'
import passport from 'passport'
import config from './config/config.js'
import ErrorHandler from './services/errors/middleware/ErrorHandler.js'
import { addLogger } from './config/customLoggers.js'
import swaggerUIExpress from 'swagger-ui-express'
import swaggerSpecs from './swaggerSpecs.js'
import cors from 'cors'


const mongoUrlDb = config.urlMongo
const app = express()
app.options('*', cors({
    origin: 'http://localhost:5173/',
    credentials: true
    }))

// app.use(cors({
//     origin: 'http://localhost:5173/',
//     credentials: true
//     }))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(addLogger)
app.use(session(
    {
        store: MongoStore.create({
            mongoUrl: mongoUrlDb,
            ttl: 60 * 1440
        }),
        secret:"coderSecret",
        resave:false,
        saveUninitialized:true
    }
))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.use("/api/documents",filesRouter)
app.use("/api/products",productsRouter)
app.use("/api/users",userRouter)
app.use("/api/carts",cartRouter)
app.use("/api/sessions",sessionsRouter)
app.use("/api/loggerstest",loggersRouter)
app.use("/",viewsRouter)
app.use("/users",usersViewsRouter)
app.use('/api/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerSpecs))


app.use(express.static(`${rootDir}/../public`))
app.use(ErrorHandler)




app.engine(`hbs`,hanblebars.engine({
    extname: `hbs`,
    defaultLayout: `main.hbs`,
    allowProtoPropertiesByDefault: true
}))

app.set("view engine","hbs")
app.set(`views`,`${rootDir}/views`)


const PORT = config.port
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
