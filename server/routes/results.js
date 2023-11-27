const router = require('express').Router();

const { User, Result } = require('../db/models');

// получить топ результатов с пользователями

router.get('/highscores', async (req, res) => {
  try {
    const highScores = await Result.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      order: [['score', 'DESC']],
      limit: 5,
    });
    res.json(highScores);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// получить все результаты
router.get('/all', async (req, res) => {
  const { email } = req.session;
  // console.log('email ---------->', email);
  try {
    if (email) {
      const results = await Result.findAll();
      res.json(results);
    }
  } catch (error) {
    res.json(error);
  }
});

// получить все результаты одного пользователя
router.get('/', async (req, res) => {
  const { email } = req.session;
  try {
    if (email) {
      //   console.log('Делаем запрос в БД по id -------->', id);
      const user = await User.findOne({ where: { email } });
      const results = await Result.findAll({ where: { userId: user.id } });
      // console.log('notes -------->', notes);
      res.json(results);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// записать результаты пользователя
router.post('/', async (req, res) => {
  try {
    const { email } = req.session;
    const { score, answers, correctAnswers } = req.body;
    console.log('req.body; ------>', req.body);

    const user = await User.findOne({ where: { email } });
    //   console.log('Пытаемся создать пользователя----->');
    // используем bcrypt для хэширования пароля
    await Result.create({ userId: user.id, score, answers, correctAnswers });
    res.json({ message: 'Игра окончена' });
  } catch (err) {
    // console.log(err, 'Какая-то ошибка...------>');
    res.json();
  }
});

module.exports = router;
