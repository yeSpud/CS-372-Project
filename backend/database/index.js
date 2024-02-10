import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const defaultData = { users: [] }

const db = new Low(new JSONFile("db.json"), defaultData)

export default db
