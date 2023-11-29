const router = require('express').Router();

const { Module } = require('../db/models');

router.post('/', async (req, res) => {
  const { user } = req.session;

  if (user) {
    try {
      const { courseid, title } = req.body;
      const data = await Module.create({ courseid, title });
      res.json(data);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});


module.exports = router;
