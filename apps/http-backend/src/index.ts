import express from 'express';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateRoomSchema, SignupSchema, SigninSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';

if(!JWT_SECRET) {
    console.log("jwt secret wasnt loaded");
}

const app = express();
app.use(express.json());
app.listen(4000);

app.get("/", (req, res) => {
    res.json({
        message: "http backend hello"
    })
})

app.post('/signup', async (req, res) => {

    const data = req.body;
    const parsedData = SignupSchema.safeParse(data);
    console.log(parsedData.data);
        
    // 400: Bad Request → for validation errors.
    if(!parsedData.success) {
        console.log(parsedData);
        res.status(400).json({
            message: "Incorrect inputs"
        });
        return;
    }


    const existinguser = await prismaClient.user.findUnique({
        where: {
            email: parsedData.data.email,
        }
    })

    // 409: Conflict → if the user already exists.
    if(existinguser) {
        res.status(409).json({
            message: "user already exists"
        })
        return;
    }

    const email = parsedData.data.email;
    const username = parsedData.data.username;
    const password = parsedData.data.password;

    const user = await prismaClient.user.create({
        data: {
            email: email,
            password: password,
            username: username
        }
    })

    // 500: Internal Server Error → if user creation fails unexpectedly
    if(!user) {
        res.status(500).json({
            message: "error creating user"
        })
        return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET! );

    // 201: Created → when user is successfully created
    res.status(201).json({
        message: token
    })
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

app.post('/createroom', async (req, res) => {
    
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // create a room in the database
    res.json({
        roomId: 123
    })

})