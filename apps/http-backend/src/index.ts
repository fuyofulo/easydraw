import express from 'express';
const app = express();
app.use(express.json());
import jwt from "jsonwebtoken";
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';

app.listen(4000);

app.get("/", (req, res) => {
    res.json({
        message: "http backend hello"
    })
})

app.post('/signup', async (req, res) => {

    // create user in database

})

app.post('/signin', async (req, res) => {

    // take username and password and check
    // return 

    const userId = 123;
    const token = jwt.sign({
        userId
    }, JWT_SECRET!)

    res.json({ token });

})

app.post('/createroom', middleware, async (req, res) => {

    // 
    res.json({
        roomId: 123
    })

})