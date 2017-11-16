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
      authors:'',
      imageLink:''
    }

    componentDidMount() {      
      if( typeof this.props.bookInfo !== undefined) {
          var imageArray = this.props.bookInfo.imageLinks
          this.setState({
              title: this.props.bookInfo.title,
              authors: this.props.bookInfo.authors,
              imageLink: imageArray.smallThumbnail,
              bookloaded : true
          })
      }
    }

    render(){
      const { title, authors, imageLink, bookloaded} = this.state
        return(
          <div>            
            {bookloaded ? (
              <div className="book">
              <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage:`url(${imageLink})` }}></div>
                <div className="book-shelf-changer">
                  <select 
                    value={this.state.selectValue} 
                    onChange={(e) => this.props.onMove(this.props.bookInfo,e.target.value)} >
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
            </div>
            ):(
              <div className="book">Could not load book :( </div>
            )}
          </div>
        )       
    }
}

export default Book