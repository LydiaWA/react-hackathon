const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const axios = require('axios');
const path = require('path');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/books', function(req, res) {
    axios
        .get(`http://api.nytimes.com/svc/books/v3/lists/Childrens-Middle-Grade.json?api-key=${process.env.NYT_API_KEY}`)
        .then(async response => {
            const nytBooks = response.data.results.books
            const bookRating = nytBooks.map(async bookitem => {
                const isbn = bookitem.primary_isbn10;
                return await axios
                    .get(`https://www.goodreads.com/book/review_counts.json?isbns=${isbn}&key=${process.env.GR_API_KEY}`)
                    .then(res => res.data.books[0].average_rating)
                    .catch(error => {console.log(error.message)})
                })
            await Promise.all(bookRating).then(res => {
                nytBooks.map((item, i) => item.rating = res[i]);
            })
            res.send(nytBooks)
        })
        .catch(error => console.log(error));
    }
)
   
module.exports = app;
