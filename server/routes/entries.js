const router = require("express").Router();
const { checkUser } = require("../middlewares/secure");

const { Entrie, Course, Module, Lesson, Step } = require("../db/models");

router.post("/", async (req, res) => {
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

router.get("/progress/:courseid/", checkUser, async (req, res) => {
  const userid = req.session.user.id;
  const { courseid } = req.params;

  const entrieProgress = await Entrie.findOne({
    where: { userid, courseid },
  });
  if (entrieProgress) {
    res.json(entrieProgress.progress);
  } else {
    res.json("Прогресс не найден");
  }
});

router.patch("/:courseid/:stepid", checkUser, async (req, res) => {
  const userid = req.session.user.id;
  const { courseid, stepid } = req.params;

  const entrieProgress = await Entrie.findOne({
    where: { userid, courseid },
  });
  if (entrieProgress) {
    const newProgress = structuredClone(entrieProgress.progress);
    const stepIdNumber = Number(stepid);
    if (!newProgress.includes(stepIdNumber)) {
      newProgress.push(stepIdNumber);
      await entrieProgress.update({ progress: newProgress });
      res.json(entrieProgress);
    } else {
      res.json("Число уже есть");
    }
  } else {
    res.json("Курс не найден");
  }
});

// test router :

router.post("/:id", async (req, res) => {
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

router.get("/check/:id", async (req, res) => {
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

router.get("/info", async (req, res) => {
  const { id } = req.session.user;

  try {
    const entries = await Entrie.findAll({
      where: { userid: id },
      include: {
        model: Course,
        attributes: { exclude: ["createdAt", "updatedAt", "long_description"] },
      },
    });
    if (entries.length === 0) return res.json([]);

    /* const { count } = await Entrie.findAndCountAll({
      where: { userid: id },
      include: {
        model: Course,
        include: {
          model: Module,
          include: { model: Lesson, include: { model: Step } },
        },
      },
    }); */

    const counts = [];
    for (let i = 0; i < entries.length; i++) {
      const { count } = await Entrie.findAndCountAll({
        where: { userid: id, courseid: entries[i].courseid },
        include: {
          model: Course,
          include: {
            model: Module,
            include: { model: Lesson, include: { model: Step } },
          },
        },
      });
      counts.push(count);
    }
    const entriesData = entries.map((el) => el.get({ plain: true }));
    const courses = entriesData
      .map((el, i) => {
        const courseInfo = {
          ...el.Course,
          progress: el.progress,
          updatedAt: el.updatedAt,
          stepsNum: counts[i],
        };
        return courseInfo;
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
    console.log(courses);
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/", async (req, res) => {
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
