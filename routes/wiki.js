const express = require('express');
const { rmSync } = require('fs');
const { extendWith } = require('lodash');
const router = express.Router();
const { Page } = require("../models");
const { addPage } = require("../views");

router.get('/', (req, res, next) => {
    res.send('Hi')
});

router.post('/', async (req, res, next) => {

    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`
  
    try {
      const page = await Page.create({
        title: req.params.title,
        content: req.params.content
      });
  
      // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
      res.redirect('/');
    } catch (error) { next(error) }
  });

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.json(page)
  } catch (error) { next(error)}
  res.send(`hit dynamic route at ${req.params.slug}`)
})

module.exports = router;