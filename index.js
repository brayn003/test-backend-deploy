const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer =  require('multer');
var upload = multer({ dest: 'static/' });

const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');

const app = express();
const PORT = 3012;
const SECRET_KEY = 'this-is-my-secret-key-876567875';

mongoose.connect('mongodb://localhost:27017/book-api-3', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
 
app.set('view engine',  'ejs');
app.set('views', __dirname + '/views');

app.use(cors());
//  body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authMiddleware = async (req, res, next) => {

  const tokenHeader = req.header('Authorization');
  if(!tokenHeader) {
    return res.status(401).json({message: 'Token not found'})
  }
  const token = tokenHeader.replace('Bearer ', '');
  const user = jwt.verify(token, SECRET_KEY);

  req.user = user;
  next();
  
}

// making static routes
app.use('/static', express.static('./static'));

app.get('/', (req, res) => {
  res.send('Hi there')
})

// read route -> GET /books
app.get('/books', authMiddleware, async (req, res) => {
  const books = await Book.find().populate('author');
  res.json(books);
});

// read route single -> GET /book/:id
app.get('/book/:id', async (req, res) => {
  const {params} = req;
  const book = await Book.findById(params.id);
  res.json(book);
});

// write route -> POST /book
app.post('/book', async (req, res) => {
  const {body} = req;
  const newBook = await Book.create(body);
  res.json(newBook);
});

// write route -> POST /author
app.post('/author', async (req, res) => {
  const {body} = req;
  const newAuthor = await Author.create(body);
  res.json(newAuthor);
});

// update route -> PATCH /book/:id

// delete route -> DELETE /book/:id

// register
app.post('/register', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({ email });
  if(!user) {
    return res.status(400).json({message: 'User does not exist'});
  }
  if(password !== user.password) {
    return res.status(400).json({message: 'Password is not the same'});
  }

  const token = jwt.sign(user.toJSON(), SECRET_KEY);

  return res.send({ token });
});

app.get('/upload', (req, res) => {
  res.render('upload')
})

/*
  multipart/form-data
  ---------
  profilePic -> File
*/

app.post('/upload', upload.single('profilePic'), async (req, res) => {
  console.log('>> This is  the file >>', req.file);

    // await User.updateOne({_id: req.query.userId}, {profilePic: req.file.path});
    // const user = await User.findById(req.query.userId); 
  return res.send({message: 'uploaded'})

  // return res.send({message: 'THere is no user-id'})
});


app.listen(PORT, () => {
  console.log('running on http://localhost:' + PORT);
})