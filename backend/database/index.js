const fs = require("node:fs/promises")
const Type = require("@sinclair/typebox")
const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const ajv = addFormats(new Ajv({ removeAdditional: "all" }), [
    "date-time",
    "time",
    "date",
    "email",
    "hostname",
    "ipv4",
    "ipv6",
    "uri",
    "uri-reference",
    "uuid",
    "uri-template",
    "json-pointer",
    "relative-json-pointer",
    "regex"
])
const filePath = "db.json"

/* Database file schema:
{
    users: [
        {
            username: string,
            password: string,
            loginAttempts: [Date, ...]
        },
        {...}
    ]
}
*/
const DatabaseSchema = Type.Object({
    users: Type.Array(Type.Object({
        username: Type.String(),
        password: Type.String(),
        loginAttempts: Type.Array(Type.String({format: "date-time"}))
    }))
})

function validateJsonData(data) {
    const validate = ajv.compile(DatabaseSchema)
    const valid = validate(data)
    if (!valid) {
        console.error(ajv.errors)
        throw new Error(`Data does not match database schema!\n${JSON.stringify(data)}`)
    }
}

async function readFromDatabase() {
    let data
    try {
        const read = await fs.readFile(filePath, { encoding: "utf-8" })
        data = JSON.parse(read)
    } catch (e) {
        data = { users: [] }
        await writeToDatabase(data)
    }

    validateJsonData(data)
    return data
}

async function writeToDatabase(data) {
    validateJsonData(data)
    await fs.writeFile(filePath, JSON.stringify(data))
}

async function addUserToDatabase(username, password) {

    let data = await readFromDatabase()
    if (data == null) {
        throw new Error("Database not initialized correctly and is in a corrupted state!")
    }

    if (data.users.find(user => user.username === username) !== undefined) {
        throw new Error("User already exists in database")
    }

    data.users.push({
        username: username,
        password: password,
        loginAttempts: []
    })
    await writeToDatabase(data)
}

async function userInDatabase(username) {
    const data = await readFromDatabase()
    if (data == null) {
        return false
    }

    return data.users.find(user => user.username === username) !== undefined
}

async function passwordMatches(username, password) {
    const data = await readFromDatabase()
    if (data == null) {
        return false
    }

    const user = data.users.find(u => u.username === username)
    return user.password === password
}

async function updateInvalidLoginAttempts(username) {
    let data = await readFromDatabase()
    if (data == null) {
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
        if (currentDate - new Date(loginAttempt).getTime() < (24 * 60 * 60 * 60 * 1000)) {
            updatedLoginAttempts.push(loginAttempt)
        }
    })
    user.loginAttempts = updatedLoginAttempts
    await writeToDatabase(data)
}

async function getInvalidLoginAttempts(username) {
    const data = await readFromDatabase()
    if (data == null) {
        return []
    }

    const user = data.users.find(u => u.username === username)
    return user.loginAttempts
}

async function addInvalidLoginAttempt(username) {
    let data = await readFromDatabase()
    if (data == null) {
        return
    }

    const user = data.users.find(u => u.username === username)
    if (user === undefined) {
        return
    }

    user.loginAttempts.push(new Date().toISOString())
    await writeToDatabase(data)
}

module.exports = { addUserToDatabase, userInDatabase, passwordMatches, removeOldLoginAttempts: updateInvalidLoginAttempts,
    getInvalidLoginAttempts, addInvalidLoginAttempt }
