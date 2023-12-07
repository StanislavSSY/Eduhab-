const router = require('express').Router();

const { Review, Entrie, User } = require('../db/models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Review.findAll({
      where:
      { courseid: id },
      include: {
        model: User,
      },
    });
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

router.get('/check/:id', async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;

  if (user) {
    const data = await Review.findOne({ where: { userid: user.id, courseid: id } });
    if (data) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  }
});

module.exports = router;
