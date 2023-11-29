const router = require('express').Router();

const { Module, Course, Lesson, Step } = require('../db/models');

router.get('/:id', async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  if (user) {
    try {
      const data = await Course.findAll({
        where: {
          id,
        },
        include: {
          model: Module,
          include: {
            model: Lesson,
          },
        },
      });
      const newdata = data.map((el) => el.get({ plain: true }));
      res.json(newdata);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

router.get('/lesson/:id', async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  if (user) {
    try {
      const data = await Step.findAll({
        where: { lessonid: id },
        order: [['id', 'ASC']],
        attributes: { exclude: ['lessonid', 'data', 'createdAt', 'updatedAt'] },
      });
      const newdata = data.map((el) => el.get({ plain: true }));
      res.json(newdata);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

module.exports = router;
