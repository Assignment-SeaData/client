export default class Connection {

    #url;

    constructor(url) {
        this.#url = url;
    }

    async #fetchRequest(url, method, body) {
        return await fetch(this.#url + url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })
    }

    async getUsers() {
        return this.#fetchRequest('', 'GET')
    }

    async addUser(id, userData) {
        //TODO
    }

    async editUser(id, userData) {
        //TODO
    }

    async deleteUser(id) {
        //TODO
    }

}