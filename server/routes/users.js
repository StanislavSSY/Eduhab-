const bcrypt = require('bcrypt');
const router = require('express').Router();

const { User } = require('../db/models');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log('req.body ------->', req.body);
    // console.log('ищем пользователя ------->', email);

    const user = await User.findOne({ where: { email } });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      //   console.log('checkPass ------->', checkPass);
      if (checkPass) {
        req.session.email = user.email; //
        req.session.name = user.name;
        res.json({ message: user.name });
      }
      res.json({ message: 'Неверный пароль' });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    // console.log('вывалились в ошибку ------->', error);
    res.json();
  }
});

router.post('/reg', async (req, res) => {
  try {
    const {
      name, email, password,
    } = req.body;
    console.log('req.body; ------>', req.body);

    const checkUser = await User.findOne({ where: { email } });
    if (checkUser) {
    //   console.log('Такой пользователь уже существует------>');

      res.json({ message: 'Такой пользователь уже существует' });
    } else {
    //   console.log('Пытаемся создать пользователя----->');
      // используем bcrypt для хэширования пароля
      const hash = await bcrypt.hash(password, 10);
      await User.create({
        name, email, password: hash,
      });
      req.session.email = email;
      //   console.log('пользователь успешно создан------>');
      res.json({ email, name, isLogged: true });
    }
  } catch (err) {
    // console.log(err, 'Какая-то ошибка...------>');
    res.json();
  }
});

router.get('/logout', (req, res) => {
  // console.log('fethc ');
  try {
    req.session.destroy((err) => {
      if (err) {
        res.sendStatus(400);
      }
      res.clearCookie('owngame');
      res.sendStatus(200);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/sessions', async (req, res) => {
  try {
    const { email, name } = req.session;
    if (email) {
      res.json({ email, name });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.json();
  }
});

module.exports = router;
