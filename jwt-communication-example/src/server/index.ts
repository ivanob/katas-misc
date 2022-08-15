import 'dotenv/config';
import express, {Request, Response} from 'express';
import cors from 'cors';
import {createUser, loginUser, removeUser, UserClear, UserJWT} from './users-service';
import {validateJWT, validateParams} from './validators';

const app = express();
app.use(express.json())
app.use(cors());

const handleError = (res: Response, error: any) => {
    console.error(error.message);
    let errorStatus = 400;
    //Bad request: wrong or missing parameters
    if(error.name === 'ValidationError'){
        errorStatus = 400;
    //Conflict between the params sent and the state of the server
    }else if(error.name === 'ConflictError'){
        errorStatus = 409;
    //Authorisation error
    }else if(error.name === 'InvalidDataError'){
        errorStatus = 401;
    //Authorisation error: wrong JWT
    }else if(error.name === 'JWTError'){
        errorStatus = 401;
    }
    res.status(errorStatus).json({
        error: error.message
    });
}

/** To register a new user. It just creates the user in memory
 * in the server. The password gets stored encrypted.
 */
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

/** This endpoint represents the authentication of the user previously
 * created. By providint the credentials (username and password) it
 * returns a JWT that is the result of the authentication and can be 
 * used by the user in following operations.
 */
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

/**
 * This endpoint removes an user from the server. It can be used
 * if the JWT token is compromised in order to push the user to
 * log in again and create another JWT token.
 */
app.delete('/api/login/remove', async (req: Request, res: Response) => {
    console.log('Received POST to remove user jwt');
    try {
        const userCredentials = validateParams(req)
        removeUser(userCredentials.username, userCredentials.password);
        res.send("User removed succesfully");
    } catch(error: any){
        handleError(res, error);
    }
});

/**
 * This is a random operation protected by authorization via JWT.
 */
app.post('/api/operation', async (req: Request, res: Response) => {
    console.log('Received POST to perform an operation protected by jwt')
    try {
        if(validateJWT(req)){
            res.send("Operation performed succesfully!");
        }
    } catch(error: any){
        handleError(res, error);
    }
});

app.listen(process.env.PORT, () => 
    console.log(`Server running on port ${process.env.PORT}!`)
);