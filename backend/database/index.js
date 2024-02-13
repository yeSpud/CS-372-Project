import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const defaultData = { users: [] }

const db = new Low(new JSONFile("db.json"), defaultData)

async function addUserToDatabase(username, password) {

    await db.read()
    if (db.data === null) {
        throw new Error("Database not initialized correctly and is in a corrupted state!")
    }

    if (db.data.users.find(user => user.username === username) !== undefined) {
        throw new Error("User already exists in database")
    }

    await db.update(data => {
        data.users.push({
            username: username,
            password: password,
            session: null,
            loginAttempts: []
        })
    })
}

async function userInDatabase(username) {
    await db.read()

    if (db.data === null) {
        return false
    }

    return db.data.users.find(user => user.username === username) !== undefined
}

async function passwordMatches(username, password) {

    await db.read()

    if (db.data === null) {
        return false
    }

    const user = db.data.users.find(u => u.username === username)
    return user.password === password
}

async function updateInvalidLoginAttempts(username) {

    await db.update(data => {
        data.users.map(user => {
            if (user.username === username) {
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
            }
        })
    })
}

async function getInvalidLoginAttempts(username) {
    await db.read()

    if (db.data === null) {
        return []
    }

    const user = db.data.users.find(u => u.username === username)
    return user.loginAttempts
}

async function addInvalidLoginAttempt(username) {
    await db.update(data => {
        data.users.map(user => {
            if (user.username === username) {
                user.loginAttempts.push(new Date())
            }
        })
    })
}

async function setSessionCookie(username, sessionCookie) {
    await db.update(data => {
        data.users.map(user => {
            if (user.username === username) {
                user.session = sessionCookie
            }
        })
    })

    return sessionCookie
}

module.exports = { createNewUser: addUserToDatabase, userInDatabase, passwordMatches, removeOldLoginAttempts: updateInvalidLoginAttempts,
    getInvalidLoginAttempts, addInvalidLoginAttempt, setSession: setSessionCookie }
