const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();

mongoose.connect('mongodb+srv://daniloTadeu:daniloTadeu@cluster0-au39i.mongodb.net/Cluste0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

//Métedo http: get, post, put, delete

app.listen(3300);
