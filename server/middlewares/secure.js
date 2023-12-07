const checkUser = (req, res, next) => {
  console.log("⚠️  【req.session.userid】➜ ", req.session.user.id);
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "Неверные учетные данные" });
  }
};

const secureRoute = (req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "Неверные учетные данные" });
  }
};

module.exports = { checkUser, secureRoute };
