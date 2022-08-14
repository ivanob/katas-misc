import { UserClear } from "./users";

export const validateParams = (req: any): UserClear => {
    if(!req.body || !(req.body.username && req.body.password)){
        throw new Error('Missing parameters: username or password');
    }
    const {username, password} = req.body;
    return {username, password};
};