const mongoose = require('mongoose');
const mongooseUpdate = require('../../MongoDb/FirstMongo.jsx');
const secondMongo = require('../../MongoDb/SecondMongo.jsx');

mongoose.connect("mongodb+srv://asuslap4545:Ymdw4d7jyihxeD4k@saurabhdatabase.ffjmaxz.mongodb.net/E_wala").then(() => {
    console.log("thrid database connection established");
}).catch((error) => {
    console.log(error.message);
})


const mon = new mongoose.Schema({
    account_id: {
        type: 'string',
    },
    products_title: {
        type: 'string',
    },
    price: {
        type: 'string',
    },
    quantity: {
        type: "number",
    },
    products_id: {
        type: 'string',
    },
    poster_img: {
        type: 'array',
    }
});

const ThridMongoose = mongoose.model("Add_to_cart", mon);

const AddToCartHandler = async (req, res) => {
    const main_id = (req.body.account);
    const products_id = (req.body.product);
    const fetchProducts = async () => {
        await secondMongo.findOne({ _id: products_id }).then((datas) => {
            const findData = async () => {
                await ThridMongoose.find({ account_id: main_id }).then((data) => {
                    if (products_id === data?.products_id) {
                        res.render('errorinCart');
                    } else if (products_id !== data?.products_id) {
                        const InsertData = async () => {
                            await ThridMongoose.insertMany({
                                account_id: main_id,
                                products_title: datas.title,
                                price: datas.price,
                                quantity: "1",
                                products_id: products_id,
                                poster_img: { ...datas }
                            }).then((data) => {
                                res.render('addtocart');
                            }).catch((err) => {
                                res.send(err.message);
                            })
                        }
                        InsertData();
                    }
                })
            }
            findData();
        })
    }
    fetchProducts();


}



const CartHandler = async (req, res) => {
    const id = req.params.id;
    await ThridMongoose.find({ account_id: id }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: err.message });
    })
}

const DeleteCardItemsHandler = async (req, res) => {
    const id = req.body.id;
    await ThridMongoose.deleteOne({ _id: id }).then(() => {
        res.send("You items are deleted successfully");
    })
}

const EditCardItemsHandler = async (req, res) => {
    const id = Object(req.body.id);
    const quantity = req.body.quantity;
    await ThridMongoose.findOne({ _id: id }).then((data) => {
        const updateData = async () => {
            await ThridMongoose.updateOne({ _id: data._id }, { $set: { quantity: quantity } }).then(() => {
                res.send("You items are updated successfully");
            })
        }
        updateData();
    })
}

const DuplicateHandlersHandler = async (req, res) => {
    const id = req.params.id;
    const product = req.params.productID;
    const data = await ThridMongoose.findOne({ account_id: id, products_id: product }).then((data) => {
        return data;
    })
    const FindById = await ThridMongoose.find({ _id: data?._id })?.then((datas) => {
        return datas;
    })
    if (data === null) {
        res.json({ error: "Not found" })
    } else {
        res.json(FindById);
    }
}

const LengthHandler = async (req, res) => {
    const id = req.params.id;
    const data = await ThridMongoose.find({ account_id: id }).then((data) => {
        return data;
    })
    if (data.length === 0) {
        res.send({ error: "items not found" });
    } else {
        res.json({ mess: data.length });
    }
}

module.exports = { AddToCartHandler, CartHandler, DeleteCardItemsHandler, EditCardItemsHandler, DuplicateHandlersHandler, LengthHandler };

