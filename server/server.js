"use strict";

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 6060;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

routes(app);

app.listen(PORT || 6060, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
