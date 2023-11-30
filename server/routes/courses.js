const router = require('express').Router();

const { Course, User } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll({
      attributes: { exclude: ['long_description', 'intro_video', 'updatedAt'] },
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    });
    res.json(courses.map((el) => el.get({ plain: true })));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/user', async (req, res) => {
  const { userid } = req.session;
  console.log(req.session);
  if (userid) {
    console.log('zashli');
    try {
      const data = await Course.findAll({ where: { userid } });
      const newdata = data.map((el) => el.get({ plain: true }));
      console.log(newdata);
      res.json(newdata);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

router.post('/', async (req, res) => {
  const { userid, title } = req.body;
  try {
    const course = await Course.create({
      userid,
      title,
      old_price: null,
      new_price: null,
      image_url: '',
      rate: 5,
      time_passage: 0,
      quantity_people: 1,
      short_description: '',
      long_description: '',
      intro_video: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.json(course.get({ plain: true }));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course) res.sendStatus(400);
    const courseData = course.get({ plain: true });
    res.json(courseData);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    new_price,
    image_url,
    time_passage,
    short_description,
    long_description,
  } = req.body;
  const intro_video = req.body?.intro_video ? req.body.intro_video : null;
  try {
    const course = await Course.findByPk(id);
    if (!course) res.sendStatus(400);
    const updatedCourse = await course.update({
      title,
      new_price,
      image_url,
      time_passage,
      short_description,
      long_description,
      intro_video,
    });
    const courseData = updatedCourse.get({ plain: true });
    res.json(courseData);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course) res.sendStatus(400);
    const isDeleted = await course.destroy();
    res.sendStatus(isDeleted ? 200 : 500);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
