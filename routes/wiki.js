const express = require("express");
const router = express.Router();
const { Page, User } = require("../models");
const { main, addPage, editPage, wikiPage } = require("../views");

// GET /wiki
router.get("/", async (req, res, next) => {
  try {
    // const pages = await Page.findAll();
    res.send('hi');
    // res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

// POST /wiki
router.post("/", async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });

    const page = await Page.create(req.body);

    await page.setAuthor(user);

    res.redirect("/wiki" + page.slug);
  } catch (error) {
    next(error);
  }
});

// POST /wiki/:slug
router.put("/:slug", async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    });

    res.redirect("/wiki/" + updatedPages[0].slug);
  } catch (error) {
    next(error);
  }
});

// DELETE /wiki/:slug
router.delete("/:slug", async (req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    });

    res.redirect("/wiki");
  } catch (error) {
    next(error);
  }
});

// GET /wiki/add
router.get("/add", (req, res) => {
  res.send(addPage());
});

// GET /wiki/:slug
router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(wikiPage(page, author));
    }
  } catch (error) {
    next(error);
  }
});

// GET /wiki/:slug/edit
router.get("/:slug/edit", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });

    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(editPage(page, author));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;






// Original attempt:
// const express = require('express');
// const { rmSync } = require('fs');
// const { extendWith } = require('lodash');
// const router = express.Router();
// const { Page } = require("../models");
// const { addPage } = require("../views");

// router.get('/', (req, res, next) => {
//     res.send('Hi')
// });

// router.post('/', async (req, res, next) => {

//     // STUDENT ASSIGNMENT:
//     // add definitions for `title` and `content`
  
//     try {
//       const page = await Page.create({
//         title: req.params.title,
//         content: req.params.content
//       });
  
//       // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
//       res.redirect('/');
//     } catch (error) { next(error) }
//   });

// router.get('/add', (req, res, next) => {
//     res.send(addPage());
// });

// router.get('/:slug', async (req, res, next) => {
//   try {
//     const page = await Page.findOne({
//       where: {
//         slug: req.params.slug
//       }
//     });
//     res.json(page)
//   } catch (error) { next(error)}
//   res.send(`hit dynamic route at ${req.params.slug}`)
// })

// module.exports = router;