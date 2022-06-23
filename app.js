const express = require('express')
const app = express();
const morgan = require('morgan');
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

app.use('/', morgan('dev'));

app.use(express.static(__dirname + "/public"));


// app.use('/user', userRouter);

app.use('/wiki', wikiRouter);

app.get('/', (req, res, next) => {
  res.redirect('/wiki')
})

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  });

  const PORT = 3000;

  const init = async () => {
    await Page.sync();
    await User.sync();
    await db.sync({force: true});
    // make sure that you have a PORT constant
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  }
  
  init();




