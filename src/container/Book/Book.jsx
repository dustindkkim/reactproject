import React, { Component } from './node_modules/react';
import axios from './node_modules/axios'
import { BrowserRouter as Router, Route, Link, NavLink } from "./node_modules/react-router-dom";
import {firebase, db} from '../../firebase/firebase'



const KEY = '';
const googleBookApi = 'https://www.googleapis.com/books/v1/volumes'


class Book extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            isLoaded: false,
            bookList: [],
            search: '',
            booksInBookShelf: []
        }
    }

    componentDidMount() {
        console.log(firebase)
        this._loadBookShelf()
        this.someListenerFromFirestore();
    }

    // bookListenserTofirestore = () => {
    //     db.collection('test')
    //     .onSnapshot(snapshot => {
    //         console.log(snapshot)
    //         let booksInBookShelf = [];
    //         snapshot.forEach(doc => {
    //             let book = doc.data();
    //             book.id = doc.id;
    //             booksInBookShelft.push(book)
    //         })
    //         console.log(booksInBookShelf)
    //     })
    // }

    addTobookshelf = item => {
        db.collection('test')
        .add(item)
        .then((item) => {
            console.log(item)
        })
        .catch(e=> {
            console.log(e)
        })
    }

    _loadBookShelf = () => {
        db.collection('test')
        .get()
        .then(snapshot => {
            let booksInBookShelf = [];
            snapshot.forEach(doc => {
                let book = doc.data();
                book.id = doc.id;
                booksInBookShelf.push(book)
            })
            console.log(booksInBookShelf)
            this.setState({
                booksInBookShelf: booksInBookShelf
        })
    })
    }
    
    someListenerFromFirestore =() => {
        db.collection('test')
        .onSnapshot((snapshot)=>{
            console.log(snapshot)

            let booksInBookshelf = [];
            snapshot.forEach(doc=>{
                let book = doc.data();
                book.id = doc.id;
                booksInBookshelf.push(book);
            })
            console.log({
                booksInBookshelf
            })
        })
    }

    _loadedBookApi = async () => {
        const books = await axios.get(googleBookApi, {
            params: {
                q: this.state.search,
                key: KEY
            }
        })
        .then( (res) => {
            console.log(res.data.items)
            return res.data.items
        })
        .catch(e => {
            console.log(e)
        })

        if(books) {
            this.setState({
                bookList: books,
                isLoaded: true
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    
    render() {
        return (
            <div>
            <input 
                type="text"
                onChange={this.handleChange}
                    />
            <button onClick={this._loadedBookApi}>Search</button>
            <div>
                {
                    this.state.bookList.map((item, index) => {
                        return (
                            <div key={index} style={{marginBottom:'10px'}}>
                                {item.volumeInfo.title}
                                <button onClick={() => this.addTobookshelf(item)}>책장에 추가</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        );
    }
}

export default Book;