import express from 'express';
const app = express();
app.use(express.json());
import jwt from "jsonwebtoken";
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from '@repo/common/types'

app.listen(4000);

app.get("/", (req, res) => {
    res.json({
        message: "http backend hello"
    })
})

app.post('/signup', (req, res) => {

    const data = CreateUserSchema.safeParse(req.body);
        
    if(!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    res.json({
        userId: 123
    })

    // create user in database

})

app.post('/signin', async (req, res) => {

    const data = SigninSchema.safeParse(req.body);
    if(!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    // take username and password and check
    // return 

    const userId = 123;
    const token = jwt.sign({
        userId
    }, JWT_SECRET!)

    res.json({ token });

})

app.post('/createroom', middleware, async (req, res) => {
    
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // 
    res.json({
        roomId: 123
    })

})