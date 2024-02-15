import Connection from "../util/Connection";

const host = process.env.SERVER_HOST || 'localhost'
const port = process.env.SERVER_PORT || 4000

export const connection = new Connection(`http://${host}:${port}`)