import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component{
    static PropTypes = {
        bookInfo: PropTypes.string.isRequired
    }
    state ={
      bookobj: '',
      bookloaded:false
    }
    componentDidMount(){
      console.log('doing mount')
      console.log(this.props.bookInfo)
      if(this.props.bookInfo !== undefined){
        this.setState({
          bookobj : JSON.parse(this.props.bookInfo),
          bookloaded : true
        })        
      }
    }

    render(){
      console.log(this.state.bookloaded)     
        return(
          <div>            
            {this.state.bookloaded ? (
              <div className="book">
              {/* <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage:`url(${this.props.bookInfo[0].imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
            </div> */}
            <div className="book-title">{this.state.bookobj.title}</div>
            <div className="book-authors">{this.state.bookobj.authors}</div>
            </div>
            ):(
              <div className="book">Could not load book :( </div>
            )}
          </div>
        )       
    }
}

export default Book