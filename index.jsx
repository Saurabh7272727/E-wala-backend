const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const router = require('./Controller/Router.jsx');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use('/', router, async (req, res, next) => {
    next();
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})



