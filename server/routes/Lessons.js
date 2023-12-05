const router = require("express").Router();

const { Lesson } = require("../db/models");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = (await Lesson.findByPk(id)).get({ plain: true });
    res.json(data);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  try {
    const { moduleid, title } = req.body;
    const data = await Lesson.create({ moduleid, title });
    res.json(data);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const lesson = await Lesson.findByPk(id);
    if (!lesson) res.sendStatus(400);
    const newLesson = await lesson.update({ title });
    res.json(newLesson.get({ plain: true }));
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = (await Lesson.findByPk(id)).get({ plain: true });
    res.json(data);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.put('/', async (req, res) => {
  const { user } = req.session;
  if (user) {
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
  const { user } = req.session;
  if (user) {
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
