const router = require('express').Router();

const { Module, Course, Lesson, Step } = require('../db/models');

router.get('/:id', async (req, res) => {
  const { email } = req.session;
  const { id } = req.params;
  if (email) {
    try {
      const data = await Course.findOne({
        where: {
          id,
        },
        include: {
          model: Module,
          include: {
            model: Lesson,
          },
        },
        order: [
          [Module, 'createdAt', 'ASC'],
          [Module, Lesson, 'createdAt', 'ASC'],
        ],
      });
      const newdata = data.get({ plain: true });
      res.json(newdata);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

router.get('/lesson/:id', async (req, res) => {
  /* const { user } = req.session; */
  const { id } = req.params;

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
});

module.exports = router;
