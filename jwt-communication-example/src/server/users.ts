import bcrypt from "bcrypt"

type User = {
    username: string,
    passwordHash: string
}
const registeredUsers: User[] = [];

export const createUser = async (username: string, password: string) => {
    const existsUser = registeredUsers.find(x => x.username === username);

    if(existsUser){
        throw new Error('The username is already taken');
    }

    const passwordHash = await bcrypt.hash(password, 1);
    registeredUsers.push({
        username,
        passwordHash
    })
};