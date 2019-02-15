import React, { Component } from 'react';
import axios from 'axios';
import Booklist from './booklist';

class App extends Component {
  constructor (props){
    super(props);

    this.state = {
      bookList: []
    };
  }

  componentDidMount() {
    axios
    .get('/books')
    .then(res => this.setState({bookList: res.data}))
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
          {this.state.bookList.map(book => (
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
      </div>
    );
  }
}

export default App;
