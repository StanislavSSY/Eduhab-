const router = require('express').Router();

const { Category } = require('../db/models');

// получить все категории
router.get('/', async (req, res) => {
  const { email } = req.session;
  // console.log('email ---------->', email);
  try {
    if (email) {
      const categories = await Category.findAll();
      res.json(categories);
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;