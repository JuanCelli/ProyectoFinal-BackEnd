import { expect } from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest'

const requester = supertest ("http://localhost:8080")

// const expect = chai.expect


describe("test App", ()=>{
	before(async () => {
        await mongoose.connect("mongodb+srv://userTest:test@ecommerce.4o9gdn5.mongodb.net/ecommerceTest?retryWrites=true&w=majority");
    })

	before(function(){
		this.productMock = {
			title: "Tablet",
			description: "Este es un producto prueba",
			price: 5600,
			thumbnail: "",
			asdfa: "asdasd",
			code: "12347",
			stock: 54,
			category: "Tecnología"
		}
		this.productMock_2 = {
			title: "Tablet",
			description: "Este es un producto prueba",
			price: 5600,
			thumbnail: "",
			asdfa: "asdasd",
			code: "123",
			stock: 54,
			category: "Tecnología"
		}
		this.cartMock = {}
		this.userMock ={
			first_name: "Juan",
			last_name: "Celli",
			email: "juanicelli@gmail.com",
			age: 20,
			password: "123"
		  }
		  
		this.cookie ={}
	})

	after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    })

	beforeEach(function () {
        this.timeout(50000)
    })



	describe("Test Product Api",async ()=>{
		it("Crear un producto: Debe crear producto correctamente", async function () {
			//Given => this.productMock

			//then
			const {statusCode, ok, _body}= await requester.post("/api/products").send(this.productMock)
			
			//Asserts That
			expect(statusCode).is.eqls(201)
			expect(_body).is.ok.and.to.have.property("_id")

			this.productMock._id = _body._id
		})

		it("Obtiene un producto por id", async function () {
			//Given => this.productMock._id

			//then
			const {statusCode, ok, _body}= await requester.get(`/api/products/${this.productMock._id}`)
			
			//Asserts That
			expect(statusCode).is.eqls(200)
			expect(_body._id).is.ok.and.to.deep.equal(this.productMock._id)
		})

		it("Elimina producto por id", async function () {
			//Given => this.productMock._id

			//then
			const {statusCode, ok, _body}= await requester.delete(`/api/products/${this.productMock._id}`)
			
			//Asserts That
			expect(statusCode).is.eqls(200)

			const productDeleted = await requester.get(`/api/products/${this.productMock._id}`)
			expect(productDeleted.statusCode).is.eqls(404)
		})
	})
	
	describe("Test Cart Api", async ()=>{
		it("Crear un carrito.", async function () {
			
			//then
			const {statusCode, ok, _body}= await requester.post("/api/carts")
			
			//Asserts That
			expect(statusCode).is.eqls(201)
			expect(_body).is.ok.and.to.have.property("_id")
			
			this.cartMock._id = _body._id
		})
		
		it("Obtener un carrito por id", async function() {
			const {statusCode, ok, _body} = await requester.get(`/api/carts/${this.cartMock._id}`)
			
			expect(statusCode).is.eqls(200)
			expect(_body).is.ok.and.to.have.property("_id")

		})
		it("Agregar un producto al carrito por id (de producto y carrito)", async function () {
			//Given => this.productMock
			
			//then
			const newProduct = await requester.post("/api/products").send(this.productMock_2)
			this.productMock_2._id = newProduct._body._id

			const {statusCode, ok, _body}= await requester.post(`/api/carts/${this.cartMock._id}/product/${this.productMock_2._id}`)
			
			//Asserts That
			expect(statusCode).is.eqls(200)
			// expect(_body).is.ok.and.to.have.property("_id")
			
			const cart = await requester.get(`/api/carts/${this.cartMock._id}`)

			const productInCart = cart._body.productsCart.some(product=>product.product._id === this.productMock_2._id)
			expect(productInCart).is.ok
		})
	})


	describe("Test Sessions Api", async ()=>{
		it("Crear usuario (resgister).", async function () {
			
			//then
			const {statusCode, ok, _body}= await requester.post("/api/sessions/register").send(this.userMock)
			
			//Asserts That
			expect(statusCode).is.eqls(201)
		})

		it("Ingresar (login).", async function () {
			
			//then
			const result = await requester.post("/api/sessions/login").send(this.userMock)

			this.cookie.data = result.headers["set-cookie"][0]

			const cookieResult = result.headers["set-cookie"][0].split(";")[0]
			const cookieData = cookieResult.split("=")
			this.cookie = {
				name: cookieData[0],
				value: cookieData[1]
			}
			
			//Asserts That
			expect(result.statusCode).is.eqls(200)
			expect(this.cookie.name).to.be.ok.and.eql("jwtCookieToken")
			expect(this.cookie.value).to.be.ok
		})

		it("Ingreso de usuario registrado a travez de sessión guardada en cookie del navegador", async function () {
			
			//then
			const {_body,statusCode} = await requester.get("/api/sessions/current").set("Cookie", `${this.cookie.name}=${this.cookie.value}`)
			
			//Asserts That
			expect(_body.currentUser?.email).to.be.ok.and.eql(this.userMock.email)
		})


	})


})