import express from 'express';
const app = express();
app.use(express.json());

app.listen(4000);

app.get("/", (req, res) => {
    res.json({
        message: "http backend hello"
    })
})