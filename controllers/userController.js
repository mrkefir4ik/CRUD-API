import { findAll, findByID, create, update, remove } from '../models/userModel.js';


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


const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(err)
        }
    })
}

function validateBody(body) {
    let fields = ['username', 'age', 'hobbies'];
    for (let key of fields) {
        if (!JSON.parse(body).hasOwnProperty(key))
            return false;
    }
    return true
}


export const createUser = async (req, res) => {
    try {
        const body = await getPostData(req)


        if (!validateBody(body)) {
            res.writeHead(400, { 'Context-type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Object Is Not Valid' }))
        }

        else {
            const { username, age, hobbies } = JSON.parse(body)

            const user = {
                username,
                age,
                hobbies,
            }

            const newUser = await create(user)

            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newUser))
        }
    }
    catch (error) {
        console.log(error)
    }
}


export const updateUser = async (req, res, id) => {
    try {
        const user = await findByID(id)

        if (!user) {
            res.writeHead(404, { 'Context-type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        }

        else {

            const body = await getPostData(req)


            if (!validateBody(body)) {
                res.writeHead(400, { 'Context-type': 'application/json' })
                res.end(JSON.stringify({ message: 'User Object Is Not Valid' }))
            }

            else {
                const { username, age, hobbies } = JSON.parse(body)

                const userData = {
                    username: username || user.username,
                    age: age || user.age,
                    hobbies: hobbies || user.hobbies,
                }

                const updUser = await update(id, userData)

                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(updUser))
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}


export const removeUser = async (req, res, id) => {
    try {
        const result = await findByID(id);
        if (result) {
            await remove(id);
            res.writeHead(204, { 'Context-type': 'application/json' })
            res.end()
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
