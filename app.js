const express = require("express");
const app = express();
const morgan = require("morgan");
// const { db, Page, User } = require('./models');
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");
const path = require("path");

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "./public"))); //serving up static files (e.g. css files)
app.use(express.urlencoded({ extended: false })); //parsing middleware for form input data
app.use(express.json());
app.use(require("method-override")("_method"));

app.use("/users", userRouter);
app.use("/wiki", wikiRouter);

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

module.exports = app;

// db. authenticate is not required to have
// db.authenticate()
//   .then(() => {
//     console.log('connected to the database');
//   });

// you can also make a seperate file
// for what is below (e.g. server.js)
// const PORT = 3000;

// const init = async () => {
//   try {
//     // Reference: https://sequelize.org/master/manual/model-basics.html#model-synchronization
//     // `.sync()` creates the table in the database if it doesn't exist (and does nothing if it already exists)
//     // We can do this two ways:
//     // 1. call `.sync()` on each individual Sequelize model (see commented out code below), or
//     // await Page.sync();
//     // await User.sync();

//     // 2. call `.sync()` on the entire Sequelize instance (e.g. `db`) since our models are defined on it (i.e. `db.define(...)`)
//     await db.sync();

//     app.listen(PORT, () => {
//       console.log(`Listening at http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error('Error starting server:', error)
//   }
// };

// init();
