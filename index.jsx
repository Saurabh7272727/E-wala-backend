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
// using gemini ai

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBHxYYMFUC22yoYOxpI95E-cUpVZBrAIRc");



const internetSeller = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("abhisek");
    return result.response.text();
}



app.use('/', router, async (req, res, next) => {
    next();
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})



