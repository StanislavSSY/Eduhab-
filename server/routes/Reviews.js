const router = require('express').Router();

const { Review, Entrie } = require('../db/models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Review.findAll({ where: { courseid: id } });
    const newdata = data.map((el) => el.get({ plain: true }));
    res.json(newdata);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post('/', async (req, res) => {
  const { user } = req.session;
  const { courseid, text, user_rate } = req.body;

  if (user) {
    try {
      const data = await Entrie.findOne({ where: { userid: user.id, courseid } });
      if (data) {
        const reviewdata = await Review.create({ userid: user.id, courseid, text, user_rate });
        res.json(reviewdata);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

module.exports = router;
