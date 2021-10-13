import users from '../data/users.js';

class User {

    createUser(user) {
        if (!users.find(element => (element.username == user.username)))
            users.push(user);
        else return "Usuario ya existe"
        return this.getUser(user);
    }

    getUser(user) {
        return users.find(element => (element.username == user.username))
    }

    getUserRoutes() { }

    getUsers() {
        return users;
    }

    deleteUser(username) {
        const result = users.findIndex((v) => {
            return v.username === username
        })
        
        if (result >= 0) {
            users.splice(result, 1);
        }
        return "Usuario borrado";
    }
}
export default new User()