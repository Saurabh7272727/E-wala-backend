const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://asuslap4545:Ymdw4d7jyihxeD4k@saurabhdatabase.ffjmaxz.mongodb.net/E_wala").then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log(err);
});

const mongooseEnter = new mongoose.Schema({
    firstName: {
        type: 'string',

    },
    lastName: {
        type: 'string',

    },
    number: {
        type: "number",

    },
    email: {
        type: 'string',

    },
    password: {
        type: "number",

    },
    ip: {
        type: "string",
    },
    add_to_cart: [
        {
            products_id: {
                type: 'string',
            },
            poster_img: {
                type: "string",
            },
            price: {
                type: "number",
            },
            title: {
                type: "string",
            },
            total_price: {
                type: "number"
            }
        }
    ]
})

const mongooseUpdate = mongoose.model("SigUp", mongooseEnter);
module.exports = mongooseUpdate;