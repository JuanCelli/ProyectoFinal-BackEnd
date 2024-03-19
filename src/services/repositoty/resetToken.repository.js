export default class ResetTokenRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getResetToken = (idUser) => {
        return this.dao.getResetToken(idUser);
    }
    createResetToken = (idUser) => {
        return this.dao.createResetToken(idUser);
    }
}