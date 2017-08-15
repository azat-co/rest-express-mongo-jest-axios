const express = require('express')
const mongodb = require('mongodb')
let app = express()

const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const uuidv1 = require('uuid/v1')
const url = process.env.DB_URI ||
 'mongodb://localhost:27017/local'
 
app.use((req, res, next)=>{
  if (!req.books) {
    mongodb.MongoClient.connect(url, (error, db)=>{
      if (error) {
        next(error)
        return
      } 
      req.books = db.collection('books')
      next()
    })
  } else {
    next()
  }
}) 

app.use(bodyParser.json())

app.get('/', (req, res)=>{
  res.status(200).send('hello')
})

app.get('/books', (req, res, next)=>{
  req.books.find({}).toArray((error, booksResults)=>{
    if (error) return next(error)
    res.status(200).send(booksResults)
  })
})

app.post('/books', (req, res)=>{
  let bookName = req.body.bookName.trim()
  let authorName = req.body.authorName.trim()
  // validate data!
  let book = {id: uuidv1(), 
    bookName: bookName,
    authorName: authorName
  }
  req.books.insert(book, (error, result)=>{
    if (error) return next(error)
    res.status(201).send(result)
  })
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
app.use(errorHandler())
if (require.main === module) {
  app.listen(3000)
} else {
  module.exports = app
}
