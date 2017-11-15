import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookShelf extends Component{
  static PropTypes = {
    title : PropTypes.string.isRequired
  } 
  state = {
        allBooks:[]
  }
  componentDidMount(){
      BooksAPI.getAll().then((allBooks) =>{
          this.setState({allBooks})
      })
  }

  render(){
      return(
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              <li>
                <Book bookInfo={JSON.stringify(this.state.allBooks[0])}/>
              </li>
            </ol>
          </div>
        </div>
      )
  }
}

export default BookShelf