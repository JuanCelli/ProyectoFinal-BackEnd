import ticketModel from "./models/ticket.model.js"


class TicketManagerMongo{
    async createTicket(data){
        try {
            const ticket = await ticketModel.create(data)
            return ticket
        } catch (error) {
            return error
        }
    }
}

export const ticketManagerMongo = new TicketManagerMongo()