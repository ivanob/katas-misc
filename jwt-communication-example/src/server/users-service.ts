import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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

export const findUserByUsername = (username: string) => registeredUsers.find(x => x.username === username);
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

export const removeUser = async (username: string) => {
    const existsUser = findUserByUsername(username);

    if(existsUser){
        const index = registeredUsers.indexOf(existsUser);
        registeredUsers.splice(index, 1);
    }
}

const createJWTToken = (username: string, password: string) => {
    const payloadToken = {
        username,
        password
    };
    return jwt.sign(payloadToken, process.env.SECRET_WORD || 'secret')
}

export const loginUser = async (username: string, password: string): Promise<UserJWT> => {
    if(!validatePassword(username, password)){
        const invalidDataErrorr: Error = new Error('Username or password are incorrect');
        invalidDataErrorr.name = 'InvalidDataError';
        throw invalidDataErrorr;
    }else{
        const passwordHash = await bcrypt.hash(password, 1);
        const jwt = await createJWTToken(username, passwordHash);
        const registeredUser = findUserByUsername(username);
        return {
            ...registeredUser as UserEncrypted,
            jwt
        }
    };
};