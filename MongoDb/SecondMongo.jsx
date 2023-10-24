const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://asuslap4545:Ymdw4d7jyihxeD4k@saurabhdatabase.ffjmaxz.mongodb.net/E_wala").then(() => {
    console.log("Connected second connection");
}).catch((e) => {
    console.log(e.message);
})
const mon = new mongoose.Schema({

})

const secondMongo = mongoose.model("products", mon);
module.exports = secondMongo;