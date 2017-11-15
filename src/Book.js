import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component{
    static PropTypes = {
        bookInfo: PropTypes.array.isRequired
    }

    render(){
        console.log(bookInfo)
        return(
            <div className="book">
            {/* <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage:`url(${bookInfo[0].imageLinks.smallThumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.bookInfo[0].title}</div>
            <div className="book-authors">{this.props.bookInfo[0].authors[0]}</div> */}
          </div>
        )       
    }
}

export default Book