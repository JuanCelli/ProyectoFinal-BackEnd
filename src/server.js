import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import rootDir from './utils/dirname.js'
import hanblebars from 'express-handlebars'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = 8080




app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)
app.use("/",viewsRouter)

app.use(express.static(`${rootDir}/public`))


app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

app.engine(`hbs`,hanblebars.engine({
    extname: `hbs`,
    defaultLayout: `main.hbs`,
}))

app.set("view engine","hbs")
app.set(`views`,`${rootDir}/views`)


