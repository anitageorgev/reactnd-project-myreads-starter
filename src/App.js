import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'

const currentRead = "Currently Reading"
const wantToRead = "Want to Read"
const read = "Read"
const currentReadShelfApi = 'currentlyReading'
const wantToReadShelfApi = 'wantToRead'
const readShelfApi = 'read'


class BooksApp extends React.Component{
    state = {
        showSearchPage: false,
        apiResultBooks:[],
        currentlyReadingBooks: [],
        wantToReadBooks: [],
        readBooks:[],
        booksLoaded: false,
        currentMove:''
    }

    componentDidMount(){
        this.updateBooksOnShelf()
    }

    updateBooksOnShelf(){
        BooksAPI.getAll().then((apiResultBooks) =>{
            this.setState({apiResultBooks})
        }).then(() => {
          if (typeof this.state.apiResultBooks[0] !== 'undefined')
          {
            var filteredcurrentBooks = this.state.apiResultBooks.filter((book)=>book.shelf == currentReadShelfApi)
            var filteredwantBooks = this.state.apiResultBooks.filter((book)=>book.shelf == wantToReadShelfApi)
            var filteredreadBooks = this.state.apiResultBooks.filter((book)=>book.shelf == readShelfApi)
            this.setState({
                currentlyReadingBooks: JSON.parse(JSON.stringify(filteredcurrentBooks)),
                wantToReadBooks: JSON.parse(JSON.stringify(filteredwantBooks)),
                readBooks: JSON.parse(JSON.stringify(filteredreadBooks)),
                booksLoaded : true
            })
          }})
    }

    handleMove =(book, shelf)=>{
        console.log('Moving book: ',book.title, ' to shelf: ', shelf)
        BooksAPI.update(book,shelf)
        .then(()=>{
            this.updateBooksOnShelf()
        })

    }
    
    render(){
        const { currentlyReadingBooks, wantToReadBooks, readBooks} = this.state        
        return(
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                        <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                        <div className="search-books-input-wrapper">
                            {/* https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md */}
                            <input type="text" placeholder="Search by title or author"/>
                        </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        {this.state.booksLoaded ? (
                            <div className="list-books-content">
                            <Bookshelf onMove={this.handleMove} shelfTitle={currentRead} shelfTitleAPI={currentReadShelfApi} booksForShelf={currentlyReadingBooks}/>
                            <Bookshelf onMove={this.handleMove} shelfTitle={wantToRead} shelfTitleAPI={wantToReadShelfApi} booksForShelf={wantToReadBooks}/>
                            <Bookshelf onMove={this.handleMove} shelfTitle={read} shelfTitleAPI={readShelfApi} booksForShelf={readBooks}/>
                        </div>
                        ):(
                            <div></div>
                        )}                        
                        <div className="open-search">
                            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                        </div>
                    </div>
                )}
            </div>
        )        
    }
}

export default BooksApp 