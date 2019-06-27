    let bookInfo = '';
    const searchForm = document.querySelector('.book-search')
    const bookContainer = document.querySelector('.book-container')

    const bookList = (e) => {
        e.preventDefault()
        let search = document.querySelector('.search-bar').value
        axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: search, 
                key: 'AIzaSyAbw8YwNKbqloMFsVKAZ7SOgdK-1trMTxE'
            }
        })
        .then(function(response) {
            bookInfo = response.data.items
        })
        .then(getData)
        .catch(function(error) {
            console.log(error)
        })
    }

    const getData = () => {
        bookInfo.forEach((item, index) => {
            let bookCover = item.volumeInfo.imageLinks.thumbnail
            let title = item.volumeInfo.title
            let subTitle = item.volumeInfo.subtitle
            let author = item.volumeInfo.authors[0]
            let publishedDate = item.volumeInfo.publishedDate
            let pageCount = item.volumeInfo.pageCount
            // let price = item.saleInfo.listPrice.amount
            let template = `
                <div class="book-component">
                    <div class="book-cover"> 
                        <img src=${bookCover}>  
                    </div>
                    <div class="book-detail-info">
                        <li class="book-title"> ${title} </li>
                        <li class="book-author"> ${author} </li>
                        <li class="book-publichedDate"> ${publishedDate} </li>
                        <li class="book-pageCount"> ${pageCount} </li>
                    </div>
                </div>`
            bookContainer.insertAdjacentHTML('beforeend', template)
        })
    }
    
    searchForm.addEventListener('submit', bookList)
    




