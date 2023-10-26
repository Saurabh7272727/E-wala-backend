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

//  orders schema for clients;
const IP = require('ip');
const OrdersSchema = new mongoose.Schema({
    name: {
        type: "string",
    },
    password: { type: "number" },
    email: { type: "string" },
    qunatity: { type: "number" },
    netprice: { type: "string" },
    account_id: { type: "string" },
    product_id: { type: "string" },
    discount_amount: { type: "number" },
    total_amount: { type: "number" },
    ip: { type: "string" },
    mal: { type: "object" }
});


const OrderSubmit = mongoose.model("Orders", OrdersSchema);



const OrderCompletedHandler = async (req, res) => {
    const ip = IP.address();
    const { name, password, email, qunatity, netprice, account_id, product_id, discount_amount, total_amount } = req.body;
    const fetchProducts = await secondMongo.findOne({ _id: product_id }).then((data) => {
        return data;
    })
    const findDataproduct = async () => {
        await ThridMongoose.deleteOne({ account_id: account_id, products_id: product_id }).then((data) => {
            return data;
        })
    }
    findDataproduct();
    await OrderSubmit.findOne({ account_id: account_id, product_id: product_id }).then((data) => {
        if (data?.account_id == account_id && data?.product_id == product_id) {
            res.status(202).json({ Message: "your order has been already completed" })
        } else {
            const orderMain = async () => {
                await OrderSubmit.insertMany({
                    name: name,
                    password: password,
                    email: email,
                    qunatity: qunatity,
                    netprice: netprice,
                    account_id: account_id,
                    discount_amount: discount_amount,
                    product_id: product_id,
                    mal: { ...fetchProducts },
                    total_amount: total_amount,
                    ip: ip
                }).then(() => {
                    res.send("Your order has been successfully completed");
                })
            }
            orderMain();
        }
    });

}


const OrderListHandler = async (req, res) => {
    const ip = req.params.ip;
    const data = await OrderSubmit.find({ ip: ip }).then((data) => {
        return data;
    }).catch((err) => {
        return err.message;
    });
    res.json(data);
}

const DeleteOrderHandler = async (req, res) => {
    const id = req.body.id;
    const data = await OrderSubmit.deleteOne({ _id: id }).then((data) => {
        return data;
    }).catch((err) => {
        return err.message;
    })
    res.send("<h2>Delete Order</h2>" || data);
}
module.exports = { AddToCartHandler, CartHandler, DeleteCardItemsHandler, EditCardItemsHandler, DuplicateHandlersHandler, LengthHandler, OrderCompletedHandler, OrderListHandler, DeleteOrderHandler };

