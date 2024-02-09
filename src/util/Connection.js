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

    #getUserData(userData) {
        const newUserData = { ...userData, phoneNumber: `${userData.countryCode} ${userData.phoneNumber}` }
        delete newUserData.countryCode
        return newUserData
    }

    async getUsers() {
        return await this.#fetchRequest('', 'GET')
    }

    async addUser(userData) {
        return await this.#fetchRequest('', 'POST', JSON.stringify(this.#getUserData(userData)))
    }

    async editUser(id, userData) {
        return await this.#fetchRequest('/' + id, 'PUT', JSON.stringify(this.#getUserData(userData)))
    }

    async deleteUser(id) {
        return await this.#fetchRequest('/' + id, 'DELETE')
    }

}