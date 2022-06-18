import { findAll, findByID } from '../models/userModel.js';


export const getUsers = async (req, res) => {
    try {

        const users = await findAll();
        res.writeHead(200, { 'Context-type': 'application/json' })
        res.end(JSON.stringify(users))

    }
    catch (error) {
        console.log(error)
    }
}

export const getUserByID = async (req, res, id) => {
    try {
        const result = await findByID(id);
        if (result) {
            res.writeHead(200, { 'Context-type': 'application/json' })
            res.end(JSON.stringify(result))
        }
        else {
            res.writeHead(404, { 'Context-type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        }

    }
    catch (error) {
        console.log(error)
    }
}

export const createUser = async (req, res) => {
    try {

    }
    catch (error) {
        console.log(error)
    }
}
