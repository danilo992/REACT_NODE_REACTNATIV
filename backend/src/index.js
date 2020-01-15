const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://daniloTadeu:daniloTadeu@cluster0-au39i.mongodb.net/Cluste0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());

//Métedo http: get, post, put, delete


app.post('/users/:id',  (req, res) => {
    console.log(req.body);
    return res.json({ message: 'olá'});
});

app.listen(3300);