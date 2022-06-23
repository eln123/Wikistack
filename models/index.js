const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});



const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'hello'
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

Page.beforeValidate( (page, options) => {
  function generateSlug (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
  page.slug = generateSlug(page.title, options)
  })

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = { db, Page, User };