import { v4 as uuidv4 } from 'uuid';

export type User = {
    username: string;
    age: number;
    hobbies: string[];
    id?: string;
}

let users: User[] = [];

export const findAll = async (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

export const findByID = async (id: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        const result: User | undefined = users.find((user) => user.id === id);
        resolve(result);
    })
}

export const create = async (user: User) => {
    return new Promise((resolve, reject) => {
        const newUser = { ...user, id: uuidv4(), };
        users.push(newUser);
        resolve(newUser);
    })
}

export const update = async (id: string, userData: User) => {
    return new Promise((resolve, reject) => {
        const index: number = users.findIndex((user) => user.id === id);
        users[index] = { id, ...userData };
        resolve(users[index]);
    })
}

export const remove = async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        users = users.filter((user) => user.id !== id)
        resolve();
    })
}