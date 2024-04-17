export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getUserByEmail = (email) => {
        return this.dao.getUserByEmail(email);
    }

    getUserById = (id) => {
        return this.dao.getUserById(id);
    }

    createUser = (data) => {
        return this.dao.createUser(data);

    }
    changeUserPassword = (id,newPassword) => {
        return this.dao.changeUserPassword(id,newPassword);
    }
    changeUserRole = (id,newRole) => {
        return this.dao.changeUserRole(id,newRole);
    }
    UpdateLastConnection = (id) => {
        return this.dao.UpdateLastConnection(id);
    }
    UploadFile = (id,fileReference, fileName,type) => {
        return this.dao.UploadFile(id,fileReference,fileName,type);
    }
}