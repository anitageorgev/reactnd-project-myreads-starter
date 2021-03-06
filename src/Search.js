import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'


class Search extends Component{
    static PropTypes = {
        onSearch : PropTypes.func.isRequired,
        searchedBooks: PropTypes.object,
        onMove : PropTypes.func.isRequired
    }
    state = {
        query: '',
    }

    updateQuery = (e) => {
        this.setState({ 
            query: e.target.value.trim(),
        }, () => {
                this.props.onSearch(this.state.query)
            })
    }

    render(){
        const {searchedBooks, onMove} = this.props
        console.log(searchedBooks)
        
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input  value={this.state.value} type="text" placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.query ? (
                        <div>
                        {searchedBooks.error ? 
                            (<ol className="books-grid"> <li> no books </li> </ol>)
                            :(
                                <ol className="books-grid">
                                {searchedBooks.map((singleBookInfo) =>
                                <li key={singleBookInfo.id}>
                                    <Book onMove={onMove} bookInfo={singleBookInfo}/>
                                </li>)}
                                </ol>
                            )}
                        </div>
                    ):(
                        <h2 className="bookshelf-title">Type something and hit enter for some FREE BANANAS! Nom nom nom</h2>
                    )}
                </div>
            </div>
        )
    }
}

export default Search