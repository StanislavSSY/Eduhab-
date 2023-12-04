const bcrypt = require('bcrypt');
const router = require('express').Router();

const { User } = require('../db/models');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);

      if (checkPass) {
        const newcookie = structuredClone(user.get({ plain: true }));
        delete newcookie.password;
        req.session.user = newcookie;
        console.log(newcookie);
        res.json(newcookie);
      }
      res.json({ message: 'Неверный пароль' });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.json();
  }
});

router.post('/reg', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const checkUser = await User.findOne({ where: { email } });
    if (checkUser) {
      res.json({ message: 'Такой пользователь уже существует' });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const data = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
        isAdmin: false,
      });
      req.session.email = email;
      req.session.userid = data.id;
      req.session.lastName = data.lastName;
      req.session.firstName = data.firstName;

      res.json({ id: data.id, email, firstName, lastName });
    }
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get('/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.sendStatus(400);
      }
      res.clearCookie('ownfinal');
      res.sendStatus(200);
    });
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get('/sessions', async (req, res) => {
  const { user } = req.session;
  try {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
