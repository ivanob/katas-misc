import bcrypt from "bcrypt";
import e from "express";
import jwt from 'jsonwebtoken';
import { getCurrentTimestampSeconds } from "./utils";

export type UserClear = {
    username: string,
    password: string
}

export type UserJWT = UserEncrypted & {
    jwt: string
}

export type UserEncrypted = {
    username: string,
    passwordHash: string
}
const registeredUsers: UserEncrypted[] = [];

export const findUserByUsername = (username: string): UserEncrypted | undefined => registeredUsers.find(x => x.username === username);

export const validatePassword = (username: string, password: string) => {
    const registeredUser = findUserByUsername(username);
    return (!registeredUser) 
        ? false
        : bcrypt.compare(password, registeredUser.passwordHash);
}

export const createUser = async (username: string, password: string) => {
    const existsUser = findUserByUsername(username);

    if(existsUser){
        const conflictError = new Error('The username is already taken');
        conflictError.name = 'ConflictError';
        throw conflictError;
    }

    const passwordHash = await bcrypt.hash(password, 1);
    const newUser = {
        username,
        passwordHash
    };
    registeredUsers.push(newUser)
    return newUser;
};

export const removeUser = async (username: string, password: string) => {
    const existsUser = findUserByUsername(username);
    if(existsUser){
        const validPassword = await bcrypt.compare(password, existsUser.passwordHash);
        if(validPassword){
            const index = registeredUsers.indexOf(existsUser);
            registeredUsers.splice(index, 1);
        }else{
            const invalidDataError: Error = new Error('Username or password are incorrect');
            invalidDataError.name = 'InvalidDataError';
            throw invalidDataError;
        }
    }else{
        const invalidDataError: Error = new Error('Username does not exists in memory');
        invalidDataError.name = 'InvalidDataError';
        throw invalidDataError;
    }
}

const createJWTToken = (username: string) => {
    const payloadToken = {
        username,
        timestamp: getCurrentTimestampSeconds()
    };
    return jwt.sign(payloadToken, process.env.SECRET_WORD || 'secret')
}

export const loginUser = async (username: string, password: string): Promise<UserJWT> => {
    if(!validatePassword(username, password)){
        const invalidDataError: Error = new Error('Username or password are incorrect');
        invalidDataError.name = 'InvalidDataError';
        throw invalidDataError;
    }else{
        const jwt = await createJWTToken(username);
        const registeredUser = findUserByUsername(username);
        return {
            ...registeredUser as UserEncrypted,
            jwt
        }
    };
};