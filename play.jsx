// const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDI6WaJ1MlIZjpaQJToM_yoGdvrJHACVF8");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateContent = async () => {

    const prompt = "green chemistry 12 rule point wise";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return { text, response };

}

module.exports = generateContent;