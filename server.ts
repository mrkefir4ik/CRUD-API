import 'dotenv/config'
import http from "http";
import { getUsers, getUserByID, createUser, updateUser, removeUser } from './controllers/userController'
import { validate } from "uuid";

const server = http.createServer((req, res) => {

    process.on("uncaughtException", () => {
        res.writeHead(500, { 'Context-type': 'application/json' })
        res.end(JSON.stringify({ message: 'Oops, something went wrong' }))
    });

    if (req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res);
    }

    else if (req.url && req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {

        const id: string = req.url.split('/')[3]

        if (!validate(id)) {
            res.writeHead(400, { 'Context-type': 'application/json' })
            res.end(JSON.stringify({ message: 'Invalid ID Format' }))
        }

        getUserByID(req, res, id);

    }

    else if (req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res);
    }

    else if (req.url && req.url.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];

        if (!validate(id)) {
            res.writeHead(400, { 'Context-type': 'application/json' })
            res.end(JSON.stringify({ message: 'Invalid ID Format' }))
        }

        updateUser(req, res, id);
    }

    else if (req.url && req.url.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];

        if (!validate(id)) {
            res.writeHead(400, { 'Context-type': 'application/json' })
            res.end(JSON.stringify({ message: 'Invalid ID Format' }))
        }

        removeUser(req, res, id);
    }

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }

});

const PORT: number | string = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})