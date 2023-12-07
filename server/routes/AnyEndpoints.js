const router = require("express").Router();

const { Module, Course, Lesson, Step } = require("../db/models");

const { twoReq } = require('../middlewares/Promise');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const lessonsData = [];
  try {
    const course = await Course.findOne({
      where: { id },
      include: {
        model: Module,
        include: {
          model: Lesson,
        },
      },
    });
    if (course.Modules.length > 1) {
      course.Modules.forEach((el) => {
        lessonsData.push(el.id);
      });
    } else {
      lessonsData.push(course.Modules[0].id);
    }
    if (lessonsData.length > 1) {
      const result = await twoReq(lessonsData, Step);
      res.json(result);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
