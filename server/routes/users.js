const bcrypt = require('bcrypt');
const router = require('express').Router();
const upload = require('../middlewares/upload');

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
      const newcookie = structuredClone(data.get({ plain: true }));
      delete newcookie.password;
      req.session.user = newcookie;
      res.json(newcookie);
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

router.patch('/', async (req, res) => {
  const { user } = req.session;
  const { firstName, lastName } = req.body;
  try {
    const userData = await User.findByPk(user.id);
    await userData.update({ firstName, lastName });
    req.session.user.firstName = firstName;
    req.session.user.lastName = lastName;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.patch('/img', upload.single('image'), async (req, res) => {
  const { user } = req.session;
  try {
    const userData = await User.findByPk(user.id);
    const image = req.file.path.slice(21);
    await userData.update({ img_url: image });
    req.session.user.img_url = image;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
