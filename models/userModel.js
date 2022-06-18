import { v4 as uuidv4 } from 'uuid';

const users = [];

export const findAll = async () => {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

export const findByID = async (id) => {
    return new Promise((resolve, reject) => {
        const result = users.find((user) => user.id === id);
        resolve(result);
    })
}

export const create = async (user) => {
    return new Promise((resolve, reject) => {
        const newUser = { ...user, id: uuidv4(), };
        users.push(newUser);
        resolve(newUser);
    })
}