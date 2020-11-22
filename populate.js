const mongoose = require('mongoose');


const Book = require('./models/Book');

const main = async () => {


  await mongoose.connect('mongodb://localhost:27017/book-api-3', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

  // const books = await Book.find();
  const books = await Book.find().populate('author');
  console.log(books);
}

main();