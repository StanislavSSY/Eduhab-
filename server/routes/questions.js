const router = require('express').Router();

const { Question } = require('../db/models');

// получить все вопросы одной категории
router.get('/:id', async (req, res) => {
  const { email } = req.session;
  const { id } = req.params;
  try {
    if (email) {
    //   console.log('Делаем запрос в БД по id -------->', id);
      const notes = await Question.findAll({ where: { categoryId: id } });
      // console.log('notes -------->', notes);
      res.json(notes);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;