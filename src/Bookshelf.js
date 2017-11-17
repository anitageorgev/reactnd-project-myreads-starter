import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component{
  static PropTypes = {
    shelfTitle : PropTypes.string.isRequired,
    shelfTitleAPI: PropTypes.string.isRequired,
    booksForShelf: PropTypes.object.isRequired,
    onMove : PropTypes.func.isRequired
  } 

  render(){
    const {shelfTitle , booksForShelf, onMove } = this.props
      return(
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfTitle}</h2>
          <div className="bookshelf-books">
            {booksForShelf != undefined &&
              <ol className="books-grid">
              {
                booksForShelf.map((singleBookInfo) =>
                <li key={singleBookInfo.id}>
                  <Book onMove={onMove} bookInfo={singleBookInfo}/>
                </li>
                )
              }
              </ol>
            }
          </div>
        </div>
      )
  }
}

export default BookShelf