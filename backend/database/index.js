const fs = require("node:fs/promises")

const filePath = "db.json"

async function readFromDatabase() {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data) // Todo verify the json schema
}

async function addUserToDatabase(username, password) {

    let data = await readFromDatabase()
    if (data === null || data.users === undefined) {
        throw new Error("Database not initialized correctly and is in a corrupted state!")
    }

    if (data.users.find(user => user.username === username) !== undefined) {
        throw new Error("User already exists in database")
    }

    data.users.push({
        username: username,
        password: password,
        session: null,
        loginAttempts: []
    })

    await fs.writeFile(filePath, data)
}

async function userInDatabase(username) {
    const data = await readFromDatabase()
    if (data === null || data.users === undefined) {
        return false
    }

    return data.users.find(user => user.username === username) !== undefined
}

async function passwordMatches(username, password) {

    const data = await readFromDatabase()
    if (data === null || data.users === undefined) {
        return false
    }

    const user = data.users.find(u => u.username === username)
    return user.password === password
}

async function updateInvalidLoginAttempts(username) {

    let data = readFromDatabase()
    if (data === null || data.users === undefined) {
        return
    }

    const user = data.users.find(u => u.username === username)
    if (user === undefined) {
        return
    }

    const updatedLoginAttempts = []
    const currentDate = new Date().getTime()
    user.loginAttempts.forEach(loginAttempt => {
        // 24 hours in a day
        // 60 minutes in an hour
        // 60 seconds in a minute
        // 1000 ms in a second
        if (currentDate -  loginAttempt.getTime() < (24 * 60 * 60 * 60 * 1000)) {
            updatedLoginAttempts.push(loginAttempt)
        }
    })
    user.loginAttempts = updatedLoginAttempts

    // Todo check if the user is indeed updated...
    await fs.writeFile(filePath, data)
}

async function getInvalidLoginAttempts(username) {
    const data = readFromDatabase()
    if (data === null || data.users === undefined) {
        return []
    }

    const user = data.users.find(u => u.username === username)
    return user.loginAttempts
}

async function addInvalidLoginAttempt(username) {

    let data = await readFromDatabase()
    if (data === null || data.users === undefined) {
        return
    }

    const user = data.users.find(u => u.username === username)
    if (user === undefined) {
        return
    }

    user.loginAttempts.push(new Date())

    // Todo check if the user is indeed updated...
    await fs.writeFile(filePath, data)
}

async function setSessionCookie(username, sessionCookie) {

    let data = await readFromDatabase()
    if (data === null || data.users === undefined) {
        return
    }

    const user = data.users.find(u => u.username === username)
    if (user === undefined) {
        return
    }

    user.session = sessionCookie


    // Todo check if the user is indeed updated...
    await fs.writeFile(filePath, data)

    return sessionCookie
}

module.exports = { createNewUser: addUserToDatabase, userInDatabase, passwordMatches, removeOldLoginAttempts: updateInvalidLoginAttempts,
    getInvalidLoginAttempts, addInvalidLoginAttempt, setSession: setSessionCookie }
