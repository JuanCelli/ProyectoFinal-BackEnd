export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }
    createTicket = (data) => {
        return this.dao.createTicket(data);
    }
}