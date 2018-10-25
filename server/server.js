const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const axios = require('axios');

app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));
// app.use(express.json());

app.get('/api/:isbn', (req,res) => {
    //make axios call
    axios
    .get(`https://www.goodreads.com/book/review_counts.json?isbns=${req.params.isbn}&key=w73qUO1zQ5W1Yy3RtKQuw`)
    
    .then(res => {
        console.log(res.data);//res.data does print out on the console
        res.send(res.data)})
    .catch(error => res.send(error))
    
});

module.exports = app;
