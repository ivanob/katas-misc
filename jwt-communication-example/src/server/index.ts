import 'dotenv/config';
import express, {Request, Response} from 'express';
import cors from 'cors';
import {createUser, loginUser, removeUser, UserClear, UserJWT} from './users-service';
import {validateJWT, validateParams} from './validators';
import e from 'express';

const app = express();
app.use(express.json())
app.use(cors());

const handleError = (res: Response, error: any) => {
    console.error(error.message);
    let errorStatus = 400;
    if(error.name === 'ValidationError'){
        errorStatus = 400;
    }else if(error.name === 'ConflictError'){
        errorStatus = 409;
    }else if(error.name === 'InvalidDataError'){
        errorStatus = 401;
    }else if(error.name === 'JWTError'){
        errorStatus = 401;
    }
    res.status(errorStatus).json({
        error: error.message
    });
}

/** To register a new user */
app.post('/api/login/register', async (req: Request, res: Response) => {
    console.log('Received POST to register a new user')
    let userCredentials: UserClear = {
        username: '',
        password: ''
    };
    try{
        userCredentials = validateParams(req)
        const userLoggedIn = await createUser(
            userCredentials.username,
            userCredentials.password
        );
        res.send(userLoggedIn);
    } catch(error: any){
        handleError(res, error);
    }
});

/** To log-in and create a new JWT */
app.post('/api/login', async (req: Request, res: Response) => {
    console.log('Received POST to login user')
    let userCredentials: UserClear = {
        username: '',
        password: ''
    };
    try {
        userCredentials = validateParams(req)
        let loggedIn: UserJWT = {
            username: '',
            passwordHash: '',
            jwt: ''
        };
        loggedIn = await loginUser(
            userCredentials.username,
            userCredentials.password
        );    
        res.send(loggedIn);
    } catch(error: any){
       handleError(res, error)
    }
});

app.delete('/api/login/remove', async (req: Request, res: Response) => {
    console.log('Received POST to remove user jwt');
    try {
        const userCredentials = validateParams(req)
        if(validateJWT(req)){
            removeUser(userCredentials.username);
            res.send("User removed succesfully");
        }else{
            const jwtError = new Error("The jwt token provided does not correspond to any user registered")
            jwtError.name = 'JWTError';
            throw jwtError;
        }
    } catch(error: any){
        handleError(res, error);
    }
});

/**
 * This is a random operation protected by authorization via jwt
 */
app.post('/api/operation', async (req: Request, res: Response) => {
    console.log('Received POST to perform an operation protected by jwt')
    try {
        if(validateJWT(req)){
            res.send("Operation performed succesfully!");
        }else{
            const jwtError = new Error("The jwt token provided does not correspond to any user registered")
            jwtError.name = 'JWTError';
            throw jwtError;
        };
    } catch(error: any){
        handleError(res, error);
    }
});

app.listen(process.env.PORT, () => 
    console.log(`Server running on port ${process.env.PORT}!`)
);