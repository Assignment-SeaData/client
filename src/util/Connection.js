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
        return await this.#fetchRequest('', 'GET')
    }

    async addUser(userData) {
        return await this.#fetchRequest('', 'POST', JSON.stringify(userData))
    }

    async editUser(id, userData) {
        return await this.#fetchRequest('/' + id, 'PUT', JSON.stringify(userData))
    }

    async deleteUser(id) {
        return await this.#fetchRequest('/' + id, 'DELETE')
    }

}