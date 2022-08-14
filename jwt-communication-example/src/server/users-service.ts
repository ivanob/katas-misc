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

const createJWTToken = (username: string, password: string) => {
    const payloadToken = {
        username
    };
    return jwt.sign(payloadToken, process.env.SECRET_WORD || 'secret')
}

export const loginUser = async (username: string, password: string): Promise<UserJWT> => {
    const registeredUser = registeredUsers.find(user => user.username === username);

    const passwordCorrect = (!registeredUser) 
        ? false
        : bcrypt.compare(password, registeredUser.passwordHash);

    if(!registeredUser || !passwordCorrect){
        const invalidDataError = new Error('Invalid user or password');
        invalidDataError.name = 'InvalidDataError';
        throw invalidDataError;
    }

    const jwt = await createJWTToken(username, password);

    return {
        ...registeredUser,
        jwt
    }
};