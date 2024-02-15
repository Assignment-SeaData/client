import Connection from "../util/Connection";

const host = process.env.SERVER_HOST || '146.148.98.64'
const port = process.env.SERVER_PORT || 4000

console.log(`host is: ${host}; port is: ${port}`);

export const connection = new Connection(`http://${host}:${port}`)