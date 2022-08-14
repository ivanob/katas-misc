import bcrypt from "bcrypt"

export type UserClear = {
    username: string,
    password: string
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

export const loginUser = async (username: string, password: string) => {
    const registeredUser = registeredUsers.find(user => user.username === username);

    const passwordCorrect = (!registeredUser) 
        ? false
        : bcrypt.compare(password, registeredUser.passwordHash);

    if(!registeredUser || !passwordCorrect){
        throw new Error('Invalid user or password');
    }
};