import crypto from 'node:crypto'

export default function uuidv4(length = 16) {
    return crypto.randomBytes(length).toString("hex")
}