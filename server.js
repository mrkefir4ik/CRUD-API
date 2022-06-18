import http from "http";
import { createSecureServer } from "http2";
import { getUsers, getUserByID, createUser } from './controllers/userController.js'

const server = http.createServer((req, res) => {

    if (req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res);
    }

    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {

        const id = req.url.split('/')[3]
        getUserByID(req, res, id);

        // res.end(JSON.stringify())
    }

    else if (req.url === '/api/users' && req.method === 'POST') {
        createSecureServer(req, res);
    }

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }

});

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})