import { cartManagerMongo } from "./dao/mongo/cart.service.js"
import { productManagerMongo } from "./dao/mongo/product.service.js"
import { resetTokenManagerMongo } from "./dao/mongo/resetToken.service.js"
import { ticketManagerMongo } from "./dao/mongo/ticket.service.js"
import { userManagerMongo } from "./dao/mongo/user.service.js"
import CartRepository from "./repositoty/cart.repository.js"
import ProductsRepository from "./repositoty/products.repository.js"
import ResetTokenRepository from "./repositoty/resetToken.repository.js"
import TicketRepository from "./repositoty/ticket.repository.js"
import UserRepository from "./repositoty/user.repository.js"



const ticketDao = ticketManagerMongo
const productsDao = productManagerMongo
const cartDao = cartManagerMongo
const userDao = userManagerMongo
const resetTokenDao = resetTokenManagerMongo


export const ticketService = new TicketRepository(ticketDao)
export const productsService = new ProductsRepository(productsDao)
export const cartService = new CartRepository(cartDao)
export const userService = new UserRepository(userDao)
export const resetTokenService = new ResetTokenRepository(resetTokenDao)