import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createUser } from './users';

const app = express();
app.use(express.json())
app.use(cors());

/** To register a new user */
app.post('/api/login/register', async (req, res) => {
    if(!req.body || !(req.body.username && req.body.password)){
        res.status(400).json({
            error: 'Missing parameters: username or password'
        })
    }
    const {username, password} = req.body;
    
    try{
        await createUser(username, password);
        res.send("All good")
    }catch(error: any){
        console.log(error.message);
        res.status(409).json({
            error: error.message
        });
    }
});

/** To log-in */
app.post('/api/login', (req, res) => {
    res.send("All good")
});

app.listen(process.env.PORT, () => 
    console.log(`Server running on port ${process.env.PORT}!`)
);