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

export const createUser = async (username: string, password: string) => {
    const existsUser = registeredUsers.find(x => x.username === username);

    if(existsUser){
        throw new Error('The username is already taken');
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
        id: '123', //FIX THIS
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
        throw new Error('Invalid user or password');
    }

    const jwt = await createJWTToken(username, password);

    return {
        ...registeredUser,
        jwt
    }
};