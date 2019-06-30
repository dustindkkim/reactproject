import React, { Component } from 'react';
import axios from 'axios';

const KEY = 'AIzaSyAMLmiFtKw5R2fbIWSDkT8yQas6eK22Gxg'
const googleBookApi = 'https://www.googleapis.com/books/v1/volumes'


class Book extends Component {

    state = {
        search: '',
        bookComponent: null
    }

    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.getApiData = this.getApiData.bind(this)
        this.getBookInfo = this.getBookInfo
        this.bookInfo = ''
        }


    handleChange (e) {
        this.setState({
            search: e.target.value
        })
    }

    getApiData(e) {
        e.preventDefault()
        axios.get(googleBookApi, {
            params: {
                q: this.state.search, 
                key: KEY
            }
        })
        .then(res => {
            this.bookInfo = res.data.items
            this.getBookInfo()
        })
    }

    getBookInfo() {
        this.setState ({
            bookComponent: ''
        })
        let bookContent = `<div>`
        this.bookInfo.forEach(item => {
            let bookCover = item.volumeInfo.imageLinks.thumbnail
            let title = item.volumeInfo.title
            let author = item.volumeInfo.authors
            let publishedDate = item.volumeInfo.publishedDate
            let pageCount = item.volumeInfo.pageCount
            // let price = item.saleInfo.listPrice.amount
            let template = `
                    <div className="book-cover"> 
                        <img src="${bookCover}" />
                    </div>
                    <div className="book-detail-info">
                        <li className="book-title"> ${title} </li>
                        <li className="book-author"> ${author} </li>
                        <li className="book-publichedDate"> ${publishedDate} </li>
                        <li className="book-pageCount"> ${pageCount} 페이지</li>
                    </div>`
            bookContent += template
            })
            bookContent += `</div>`
            this.setState({
                bookComponent: bookContent
            })
        }

    render() {
        return (
            <div>
                <form className="book-search">
                    <input className="keyword"
                        name="search"
                        type="text"
                        placeholder="검색어를 입려해주세요."
                        value={this.state.search}
                        onChange={this.handleChange}/>
                    <button type="submit" onClick={this.getApiData}> Search </button>
                </form>
                <div dangerouslySetInnerHTML={ {__html: this.state.bookComponent} }>
                </div>
            </div>
        );
    }
}

export default Book;