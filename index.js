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
      req.db = db
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

app.get('/:collectionName', (req, res, next)=>{
  req.db.collection(req.params.collectionName)
    .find({}).toArray((error, booksResults)=>{
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
    bookName: bookName,
    authorName: authorName
  }
  req.books.update({
    _id: mongodb.ObjectID(req.params.id)
  }, 
    {$set: book}, 
    (error, result)=>{
      if (error) return next(error)
      res.status(200).send(result)
  })
})

app.delete('/books/:id', (req, res)=>{
  req.books.remove({_id: mongodb.ObjectID(req.params.id)}, 
  (error, result)=>{
    if (error) return next(error)
    res.status(204).send()
  })
})
app.use(errorHandler())
if (require.main === module) {
  app.listen(3000)
} else {
  module.exports = app
}
