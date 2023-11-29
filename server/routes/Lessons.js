const router = require('express').Router();

const { Lesson } = require('../db/models');

router.post('/', async (req, res) => {
  const { user } = req.session;

  if (user) {
    try {
      const { moduleid, title } = req.body;
      const data = await Lesson.create({ moduleid, title });
      res.json(data);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

module.exports = router;
