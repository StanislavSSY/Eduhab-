const router = require("express").Router();

const { Comment, User } = require("../db/models");

router.get("/:id", async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  if (user) {
    try {
      const data = await Comment.findAll({
        where: { stepid: id },
        include: {
          model: User,
        },
      });
      const newdata = data.map((el) => el.get({ plain: true }));
      res.json(newdata);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

router.post("/", async (req, res) => {
  const { user } = req.session;
  if (user) {
    const { userid, text, stepid } = req.body;
    console.log(req.body);
    try {
      const update = await Comment.create({ userid, stepid, text });
      const data = await Comment.findOne({
        where: { id: update.id },
        include: {
          model: User,
        },
      });
      const newdata = data.get({ plain: true });
      res.json(newdata);
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

module.exports = router;
