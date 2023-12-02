const router = require('express').Router();

const { Module, Course, Lesson } = require('../db/models');

router.post('/', async (req, res) => {
  const { email } = req.session;

  if (email) {
    try {
      const { courseid, title } = req.body;
      const data = await Module.create({ courseid, title });
      res.json(data);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

router.post('/:id', async (req, res) => {
  const { email } = req.session;
  if (email) {
    try {
      const { courseid, title } = req.body;
      const data = await Module.create({ courseid, title });
      const newdata = await Course.findOne({
        where: {
          id: courseid,
        },
        include: {
          model: Module,
          include: {
            model: Lesson,
          },
        },
      });
      const newlastdata = newdata.get({ plain: true });
      console.log(newlastdata);
      res.json(newlastdata);
    } catch (error) {
      res.sendStatus(400);
    }
  }
})

router.put('/', async (req, res) => {
  const { email } = req.session;

  if (email) {
    try {
      const { id, title } = req.body;
      const data = await Module.findOne({ where: { id } });
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
  const { id } = req.params;
  if (email) {
    try {
      const data = await Module.findOne({ where: { id } });
      data.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
});


module.exports = router;
