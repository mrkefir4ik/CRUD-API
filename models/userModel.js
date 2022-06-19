import { v4 as uuidv4 } from 'uuid';

let users = [];

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

export const update = async (id, userData) => {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((user) => user.id === id);
        users[index] = { id, ...userData };
        resolve(users[index]);
    })
}

export const remove = async (id) => {
    return new Promise((resolve, reject) => {
        users = users.filter((user) => user.id !== id)
        resolve();
    })
}