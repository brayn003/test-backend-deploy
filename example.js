const Book = require('./models/Book');
const mongoose = require('mongoose');

const main = async ()  =>  {

  const con = await mongoose.connect('mongodb://localhost:27017/book-api-3', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

  try {
    // create
    await Book.create({ name: 'awesome2', yearOfRelease: 2010, dateWritten: new Date() });
    await Book.create({ name: 'awesome22', yearOfRelease: 2012 });
    await Book.create({ name: 'awesome222', yearOfRelease: 2014 });


    // read
    const res = await Book.find();
    console.log(res);

    // update
    await Book.updateOne({ name: 'awesome2' }, { name: 'awwesome4' });


    // delete
    await Book.remove({ name: 'awesome22' })


  } catch(err) {
    console.log('err', err)
  }

  await con.disconnect();
}

main();