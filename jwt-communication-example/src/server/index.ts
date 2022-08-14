import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import {createUser, loginUser, UserClear, UserJWT} from './users-service';
import { validateJWT, validateParams } from './validators';

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
    try{
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

app.post('/api/login/remove', async (req: Express.Request, res: Express.Response) => {
    console.log('Received POST to remove user jwt')
});

/**
 * This is a random operation protected by authorization via jwt
 */
app.post('/api/operation', async (req: Request, res: Response) => {
    console.log('Received POST to perform an operation protected by jwt')
    try{
        if(validateJWT(req)){
            res.send("Operation performed succesfully!");
        }else{
            res.status(400).json({
                error: "The jwt token provided does not correspond to any user registered"
            })
        };
    }catch(error: any){
        handleError(res, error);
    }
});

app.listen(process.env.PORT, () => 
    console.log(`Server running on port ${process.env.PORT}!`)
);