const mongooseUpdate = require('../MongoDb/FirstMongo.jsx');
require('dotenv').config();
const IP = require('ip');
const SigupHandler = async (req, res) => {
    const number = Number(req.body.number);
    await mongooseUpdate.findOne({ number: number }).then((data) => {
        const dataNumber = Number(data?.number);
        if (dataNumber === number) {
            res.render('error');
        } else if (data?.number !== number) {
            mongooseUpdate.insertMany({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                number: req.body.number,
                email: req.body.email,
                ip: "hello@example.com"
            }).then((data) => {
                const firstName = req.body.firstName;
                res.render('index', { data: firstName, pass: req.body.password });
            }).catch((err) => {
                res.send(err.message);
            })
        }
    })
}


const LoginHandler = async (req, res) => {
    const ipAddress = IP.address();
    const number = Number(req.params.number);
    const password = Number(req.params.password);
    await mongooseUpdate.findOne({ number: number, password: password }).then((data) => {
        if (data?.number === number && data?.password === password) {
            mongooseUpdate?.updateOne({ number: number }, { $set: { ip: ipAddress } })?.then((e) => {
                res.json(data);
            }).catch((err) => {
                res.send(err.message);
            })
        } else if (data?.number === number || data?.password !== password) {
            res.json({ error: "your password is wrong ", message: "Try again " });
        } else if (data?.number !== number || data?.password === password) {
            res.json({ error: "your mobile number is wrong ", message: "Try again " });
        } else {
            res.json({ error: "Invaild user, first you sigin ", message: "Try again " });
        }

    }).catch((err) => {
        res.send("err.message");
    });
}


const DelectHandler = async (req, res) => {
    await mongooseUpdate.deleteMany().then(() => {
        console.log("delect");
    })
}

const HeadersHandler = async (req, res) => {
    const ipAddress = IP.address();
    await mongooseUpdate.findOne({ ip: ipAddress }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send(err.message);
    })
}

const LogoutHandler = async (req, res) => {
    const id = req.body.id;
    await mongooseUpdate.updateOne({ _id: id }, { ip: "0000-0000-0000" }).then((data) => {
        res.send("<h1>Logout saved</h1>");
    }).catch((err) => {
        res, send(err.message);
    });
}
const homeBanner = require('../Data/Home.json');
const HomeHandler = async (req, res) => {
    res.json(homeBanner);
}

const electronics = require('../Data/Best_of_ele.json');
const beautyproducts = require('../Data/Beauty_of_section.json');
const ProductsHandler = async (req, res) => {
    const pro = req.params.products;
    if (pro == "electronics") {
        res.json(electronics);
    } else if (pro == 'beautyproducts') {
        res.json(beautyproducts);
    }
}

const secondMongo = require('../MongoDb/SecondMongo.jsx');
const ProductsPageHandler = async (req, res) => {
    const type = req.params.type;
    await secondMongo.find({ type: type }).then((data) => {
        if (data) {
            res.json(data)
        } else if (!data) {
            res.json({ error: "This products is not available for this type of product" });
        }

    }).catch((err) => {
        res.send(err);
    })
}

const DetailsPageHandler = async (req, res) => {
    const id = req.params.id;
    await secondMongo.findOne({ _id: id }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send(err.message || err);
    })
}
// db.recipes.find({ $text: { $search: "chocolate" } })
const searchProducts = async (req, res) => {
    const query = req.params.query;
    // console.log(typeof query);
    await secondMongo.find({ "type": { $regex: ".*" + query + ".*", $options: 'i' } }).then((data) => {
        res.status(201).json(data);
    }).catch((error) => {
        res.status(404).json({ message: `${query} are not found`, next: "Searched again" });
        console.log(error);
    })
}



// genrative ai use google.ai;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const googleAi = async (req, res) => {
    console.log(req.params.questions);
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const result = await model.generateContent(req.params.questions);
        const response = await result.response;
        const text = response.text();
        res.send({
            data: text,
        })
    } catch (error) {
        res.send({
            data: "Google server are so busy try to next time : 300s ago",
        })
    }
}

module.exports = { googleAi, searchProducts, SigupHandler, LoginHandler, DelectHandler, HeadersHandler, LogoutHandler, HomeHandler, ProductsHandler, ProductsPageHandler, DetailsPageHandler };