import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {createUser, loginUser, UserClear, UserJWT} from './users-service';
import { validateParams } from './validators';

const app = express();
app.use(express.json())
app.use(cors());

/** To register a new user */
app.post('/api/login/register', async (req, res) => {
    console.log('Received POST to register a new user')
    let userCredentials: UserClear = {
        username: '',
        password: ''
    };
    try{
        userCredentials = validateParams(req)
    } catch(error){
        res.status(400).json({
            error: 'Missing parameters: username or password'
        });
    }
    
    try{
        const userLoggedIn = await createUser(
            userCredentials.username,
            userCredentials.password
        );
        res.send(userLoggedIn);
    }catch(error: any){
        res.status(409).json({
            error: error.message
        });
    }
});

/** To log-in */
app.post('/api/login', async (req, res) => {
    console.log('Received POST to login user')
    let userCredentials: UserClear = {
        username: '',
        password: ''
    };
    try{
        userCredentials = validateParams(req)
    } catch(error){
        res.status(400).json({
            error: 'Missing parameters: username or password'
        });
    }

    let loggedIn: UserJWT = {
        username: '',
        passwordHash: '',
        jwt: ''
    };
    try{
        loggedIn = await loginUser(
            userCredentials.username,
            userCredentials.password
        );
    }catch(error: any){
        res.status(401).json({
            error: error.message
        })
    }
    res.send(loggedIn);
});

app.post('/api/login/remove', async (req, res) => {
    console.log('Received POST to remove user jwt')
});

app.listen(process.env.PORT, () => 
    console.log(`Server running on port ${process.env.PORT}!`)
);