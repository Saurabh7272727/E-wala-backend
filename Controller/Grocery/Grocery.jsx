const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://asuslap4545:Ymdw4d7jyihxeD4k@saurabhdatabase.ffjmaxz.mongodb.net/E_wala").then((data) => {
    console.log("grocery is connected to the database");
}).catch((error) => {
    console.log("Error connecting");
})

const md = new mongoose.Schema({});

const GroceryData = mongoose.model("grocerymobile", md);


const GroceryMobileHandler = async (req, res) => {
    const data = await GroceryData?.find({})?.then((datas) => {
        return datas;
    })
    res.json(data);
}

module.exports = { GroceryMobileHandler };