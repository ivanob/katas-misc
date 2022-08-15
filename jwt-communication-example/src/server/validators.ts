import { findUserByUsername, UserClear } from "./users-service";
import jwt from 'jsonwebtoken';

export const validateParams = (req: any): UserClear => {
    if(!req.body || !(req.body.username && req.body.password)){
        const validationError = new Error('Missing parameters: username or password');
        validationError.name = 'ValidationError';
        throw validationError;
    }
    const {username, password} = req.body;
    return {username, password};
};

export const validateJWT = (req: any): boolean => {
    const authorization = req.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith(
        'bearer'
    )){ //It is the correct way of authorization
        const token = authorization.substring(7); // Remove the 'bearer ' part
        const decodedToken: any = jwt.verify(token, process.env.SECRET_WORD || 'secret');
        
        if(!token || !decodedToken){
            throw new Error('Token missing or invalid');
        }else{
            const decodedUsername = decodedToken.username;
            const userStored = findUserByUsername(decodedUsername);
            if(userStored && decodedToken.password === userStored.passwordHash){
                return true;
            }else{
                return false;
            }
        }
    } else {
        throw new Error('Wrong Authorization method: must be bearer jwt token');
    }
};