import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component{
    static PropTypes = {
        bookInfo: PropTypes.object,
        onMove : PropTypes.func.isRequired
    }
    
    state ={
      bookloaded:false,
      title:'',
      authors:[],
      imageLink:'',
      currentShelf: ''
    }

    componentDidMount() {      
      if( typeof this.props.bookInfo !== undefined) {
          var imageArray = this.props.bookInfo.imageLinks
          this.setState({
              title: this.props.bookInfo.title,
              authors: this.props.bookInfo.authors ? this.props.bookInfo.authors : [],
              imageLink: imageArray ? imageArray.smallThumbnail : null,
              currentShelf: this.props.bookInfo.shelf ? this.props.bookInfo.shelf:"none",
              bookloaded : true
          })
      }
    }
    handleMove(book, shelf) {
      this.setState({
        currentShelf : shelf
      },()=> this.props.onMove(book, this.state.currentShelf))
    }

    render(){
      const { title, authors, imageLink, bookloaded} = this.state
      const {onMove, bookInfo} = this.props
        return(
          <div>            
            {bookloaded ? (
              <div className="book">
              <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage:`url(${imageLink})` }}></div>
                <div className="book-shelf-changer">
                  <select 
                    value={this.state.currentShelf} 
                    onChange={(e) => this.handleMove(bookInfo,e.target.value)}>
                    <option value="na" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors.join(', ')}</div>
            </div>
            ):(
              <div className="book">Could not load book :( </div>
            )}
          </div>
        )       
    }
}

export default Book