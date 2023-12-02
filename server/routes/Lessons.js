const router = require('express').Router();

const { Lesson } = require('../db/models');

router.post('/', async (req, res) => {
  const { email } = req.session;
  if (email) {
    try {
      const { moduleid, title } = req.body;
      const data = await Lesson.create({ moduleid, title });
      res.json(data);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

router.put('/', async (req, res) => {
  const { email } = req.session;
  if (email) {
    try {
      const { id, title } = req.body;
      console.log(req.body);
      const data = await Lesson.findOne({ where: { id } });
      const newdata = await data.update({ title });
      const nnewdata = newdata.get({ plain: true });
      res.json(nnewdata);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
});

router.delete('/:id', async (req, res) => {
  const { email } = req.session;
  if (email) {
    try {
      const { id } = req.params;
      console.log('da');
      const data = await Lesson.findOne({ where: { id } });
      data.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
});

module.exports = router;
