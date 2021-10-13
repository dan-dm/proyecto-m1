import users from '../data/users.js';

class User {

    createUser(user) {
        users.push(user);
        return this.getUser(user);
    }

    getUser(user) {
        return users.find(element => (element.username == user.username))
    }

    getUserRoutes(){}
}
export default new User()