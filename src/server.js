import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = 8080


app.get("/",(req,res)=>{
    res.send("Hola")
})

app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)


app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})