import React, { Component } from 'react';
import axios from 'axios';
import Booklist from './booklist';


class App extends Component {
  constructor (props){
    super(props);

    this.state = {
      booklist: []
    };
  }
  componentWillMount() {
    axios
      .get('http://api.nytimes.com/svc/books/v3/lists/Childrens-Middle-Grade.json?api-key=1b151af5bfd24cc2aa9cb816d78a1efa')
      .then(response => {
          const result = response.data.results.books;
          {/*result.map(item => {
            //don't know why the response data is undefined
            axios
            .get('/api/' + item.primary_isbn10)
            .then(responsefromserver => {
              item.rating = responsefromserver.data.books[0].averate_rating;
              })
          })*/}
          this.setState({ booklist: result });
        }
      )
      
    
    }

  render() {
    return (
      <div className='App'>
      <div className = "jumbotron"> 
          <div className = "container text-center">
           <h1>Best Selling Children's Books</h1>
            <p>Best selling middle grade children's books from The New York Times</p>
            <hr className = "my-4"></hr>
          </div>
      </div>
        
      <div className ="card-columns">
        { 
          this.state.booklist.map(book => (
          <Booklist
            key = {book.primary_isbn10}
            rank = {book.rank}
            title = {book.title}
            description = {book.description}
            amazon = {book.amazon_product_url}
            author = {book.author}
            cover = {book.book_image}
            rating = {book.rating}
            />
          ))
        }
      </div>
      {/*<pre>{ JSON.stringify(this.state.booklist, null, 2) }</pre>*/}
      </div>
    );
  }
}

export default App;
