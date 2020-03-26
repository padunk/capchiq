require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userPool = require('./database/database');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.end("hello");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
