const router = require('express').Router();

const { Comment } = require('../db/models');

router.get('/:id', async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  if (user) {
    try {
      const data = await Comment.findAll({ where: { stepid: id } });
      const newdata = data.map((el) => el.get({ plain: true }));
      res.json(newdata);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

router.post('/', async (req, res) => {
  const { user } = req.session;
  if (user) {
    const { userid, text, stepid } = req.body;
    try {
      const data = await Comment.create({ userid, stepid, text });
      res.json(data);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

module.exports = router;
