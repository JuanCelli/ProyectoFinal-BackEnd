export default class ResetTokenRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getResetTokenById = (idToken) => {
        return this.dao.getResetTokenById(idToken);
    }
    createResetToken = (idUser) => {
        return this.dao.createResetToken(idUser);
    }
}