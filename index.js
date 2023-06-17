const mongoose = require('mongoose');
const Mango = require('./mango')
const express = require("express");
require('dotenv').config();
const app = express();

let url = process.env.MONGODB_URL;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

url = url.replace('{0}', username).replace('{1}', password)


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`MongoDB url ${url}`);
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(`MongoDB url ${url}`);
        console.error('Error connecting to MongoDB:', error);
    });

app.get('/', function (req, res) {
    res.write('API is running');
    res.end();
});

app.get('/list', function (req, res) {
    Mango.find()
        .then(mangos => {
            res.json(mangos)
            res.end();
        })
        .catch(error => {
            res.json(error)
            res.end();
        });
});

app.get('/create', function (req, res) {
    var results = [];
    var localMango = ['Deshari', 'Langra', 'Chussa', 'Someother mango', 'Fev mango', 'khatta mango', 'ok ok mango', 'yellow mango', 'green mango', 'honey bunny mango'];
    for (var i = 0; i < 10; i++) {
        const mango = new Mango({
            name: localMango[i],
            price: i * 200
        });

        mango.save()
            .then((data) => {
                results.push(data);
            })
            .catch((error) => {
                res.json(error)
                res.end();
            });
    }

    Mango.find()
        .then(mangos => {
            res.json(mangos)
            res.end();
        })
        .catch(error => {
            res.json(error)
            res.end();
        });
});

app.listen(process.env.PORT, function () {
    console.log(`Server started on port ${process.env.PORT}`);
});