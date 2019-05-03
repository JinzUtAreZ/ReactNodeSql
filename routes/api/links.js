const express = require('express');
const router = express.Router();
const pages = require('../api/links');

// Gets All pages
router.get('/', (req, res) => res.json(pages));

// Get Single page
router.get('/:id', (req, res) => {
  const found = pages.some(page => page.id === parseInt(req.params.id));

  if (found) {
    res.json(pages.filter(page => page.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No page with the id of ${req.params.id}` });
  }
});

// Create page
router.post('/', (req, res) => {
  const newpage = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newpage.name || !newpage.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  pages.push(newpage);
  res.json(pages);
  // res.redirect('/');
});

// Update page
router.put('/:id', (req, res) => {
  const found = pages.some(page => page.id === parseInt(req.params.id));

  if (found) {
    const updpage = req.body;
    pages.forEach(page => {
      if (page.id === parseInt(req.params.id)) {
        page.name = updpage.name ? updpage.name : page.name;
        page.email = updpage.email ? updpage.email : page.email;

        res.json({ msg: 'page updated', page });
      }
    });
  } else {
    res.status(400).json({ msg: `No page with the id of ${req.params.id}` });
  }
});

// Delete page
router.delete('/:id', (req, res) => {
  const found = pages.some(page => page.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'page deleted',
      pages: pages.filter(page => page.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No page with the id of ${req.params.id}` });
  }
});

module.exports = router;
