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

    // course.get({ plain: true }).Modules.forEach((modul) => {
    //   modul.Lessons.forEach((lesson) => {
    //     lesson.steps.forEach((step) => {
    //       progress[step.id] = false;
    //     });
    //   });
    // });

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
      progress,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.patch('/:courseid/:stepid', async (req, res) => {
  // const { userid } = req.session;
  const { courseid, stepid } = req.params;
  const userid = 1;
  const entrieProgress = await Entrie.findOne({
    where: { userid, courseid },
  });
  /* console.log(typeof entrieProgress.progress);
  const parse = JSON.parse(entrieProgress.progress); */
  const newProgress = structuredClone(entrieProgress.progress);
  newProgress.push(Number(stepid));

  /* entrieProgress.progress = JSON.stringify(parse); */
  await entrieProgress.update({ progress: newProgress });
  res.json(entrieProgress);
});

// test router :

router.post('/:id', async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  if (user) {
    try {
      const checkdouble = await Entrie.findOne({
        where: { userid: user.id, courseid: id },
      });
      if (checkdouble) {
        res.sendStatus(400);
      } else {
        const progress = [];
        const data = await Entrie.create({
          userid: user.id,
          courseid: id,
          progress,
        });
        const coursedata = await Course.findOne({ where: { id } });
        const newcoursedata = coursedata.get({ plain: true });
        const newquantity = newcoursedata.quantity_people + 1;
        coursedata.update({ quantity_people: newquantity });
        res.json(data);
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
});

router.get('/check/:id', async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;

  if (user) {
    try {
      const data = await Entrie.findOne({
        where: { userid: user.id, courseid: id },
      });
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
});

// --------------------------

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
