const router = require('express').Router();

const { Entrie, Course, Module, Lesson, Step } = require('../db/models');

router.post('/', async (req, res) => {
  const { userid, courseid } = req.body;
  try {
    const course = await Course.findByPk(courseid, {
      include: {
        model: Module,
        include: { model: Lesson, include: { model: Step } },
      },
    });
    if (!course) res.sendStatus(400);
    const progress = [];
    /* course.get({ plain: true }).Modules.forEach((modul) => {
      modul.Lessons.forEach((lesson) => {
        lesson.steps.forEach((step) => {
          progress.push({
            id: step.id,
            type: step.type,
            status: false,
          });
        });
      });
    }); */
    const entrie = await Entrie.create({
      userid,
      courseid,
      progress: JSON.stringify(progress),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/info', async (req, res) => {
  const { id } = req.session.user;
  try {
    const entries = await Entrie.findAll({
      where: { userid: id },
      include: {
        model: Course,
        attributes: { exclude: ['createdAt', 'updatedAt', 'long_description'] },
      },
    });
    if (entries.length === 0) return res.json([]);

    const { count } = await Entrie.findAndCountAll({
      where: { userid: id },
      include: {
        model: Course,
        include: {
          model: Module,
          include: { model: Lesson, include: { model: Step } },
        },
      },
    });
    const entriesData = entries.map((el) => el.get({ plain: true }));
    const courses = entriesData
      .map((el) => {
        const courseInfo = {
          ...el.Course,
          progress: el.progress,
          updatedAt: el.updatedAt,
          stepsNum: count,
        };
        return courseInfo;
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/', async (req, res) => {
  const { userid, courseid } = req.body;
  try {
    const entrie = await Entrie.findAll({
      where: {
        userid,
        courseid,
      },
    });
    if (!entrie) res.sendStatus(400);
    const isDeleted = await entrie.destroy();
    res.sendStatus(isDeleted ? 200 : 500);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
