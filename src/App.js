import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Route, Link } from 'react-router-dom'
import Search from './Search'


const currentRead = "Eating right now"
const wantToRead = "Gonna eat this tomorrow"
const read = "Ate this shi yesterday"
const currentReadShelfApi = 'currentlyReading'
const wantToReadShelfApi = 'wantToRead'
const readShelfApi = 'read'

// link to Git repo: https://github.com/anitageorgev/reactnd-project-myreads-starter.git

class BooksApp extends React.Component{
    state = {
        showSearchPage: false,
        apiResultBooks:[],
        currentlyReadingBooks: [],
        wantToReadBooks: [],
        readBooks:[],
        booksLoaded: false,
        currentMove:'',
        searchedBooks:[]
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

    searchBooks =(query)=>{
        if(query != null && query.trim() !== ''){
            console.log( 'seraching for :' , query)
            BooksAPI.search(query,15)
            .then((e)=>{
                this.setState({
                    searchedBooks: JSON.parse(JSON.stringify(e))
                })
            })
        }
        else{
            console.log('got empty value for search:', query)
            this.setState({
                searchedBooks: []
            })
        }
       
    }

    render(){
        const { currentlyReadingBooks, wantToReadBooks, readBooks, searchedBooks} = this.state        
        return(
            <div className="app">
                <Route exact path='/' render={() =>(
                    <div className="list-books">
                    <div className="list-books-title">
                        <h1>Wanna Banana?</h1>
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
                    <div className="open-search" >
                        <Link to='/search' className='add-contact'>Add a book</Link>
                    </div>
                </div>
                )}/>
                <Route path='/search' render={({history}) =>(
                   <Search onSearch={this.searchBooks} searchedBooks={searchedBooks} onMove={this.handleMove}/>
                )}/>
            </div>
        )        
    }
}

export default BooksApp 