const express = require('express')
let app = express()

const bodyParser = require('body-parser')
const uuidv1 = require('uuid/v1')


let books = []

app.use(bodyParser.json())

app.get('/', (req, res)=>{
  res.status(200).send('hello')
})

app.get('/books', (req, res)=>{
  res.status(200).send(books)
})

app.post('/books', (req, res)=>{
  let bookName = req.body.bookName.trim()
  let authorName = req.body.authorName.trim()
  // validate data!
  let book = {id: uuidv1(), 
    bookName: bookName,
    authorName: authorName
  }
  books.push(book)
  // console.log(book)
  res.status(201).send(book)
})

app.put('/books/:id', (req, res)=>{
  let bookName = req.body.bookName.trim()
  let authorName = req.body.authorName.trim()
  // validate data!
  let book = {
    id: req.params.id, 
    bookName: bookName,
    authorName: authorName
  }
  let index = books.findIndex((value)=>{
    if (value.id == book.id) return true
  })
  books[index] = book
  // console.log(book)
  res.status(200).send(book)
})

app.delete('/books/:id', (req, res)=>{
  let index = books.findIndex((value)=>{
    if (value.id == req.params.id) return true
  })
  books.splice(index, 1)
  // console.log(book)
  res.status(204).send()
})

if (require.main === module) {
  app.listen(3000)
} else {
  module.exports = app
}
