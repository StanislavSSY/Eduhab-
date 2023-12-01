const router = require('express').Router();

const { Step } = require('../db/models');

router.post('/', async (req, res) => {
  const { lessonid, type, data } = req.body;
  try {
    const step = await Step.create({
      lessonid,
      type,
      data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.json(step.get({ plain: true }));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const step = await Step.findByPk(id);
    if (!step) res.sendStatus(400);
    const stepData = step.get({ plain: true });
    /* if (stepData.type.startsWith('TEST')) {
      stepData.data = JSON.parse(stepData.data);
      delete stepData.data.answer;
    } */
    res.json(stepData);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, type } = req.body;
  console.log(data);
  try {
    const step = await Step.findByPk(id);
    if (!step) res.sendStatus(400);
    const updatedStep = await step.update({ data, type });
    res.json(updatedStep.get({ plain: true }));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const step = await Step.findByPk(id);
    if (!step) res.sendStatus(400);
    const isDeleted = await step.destroy();
    res.sendStatus(isDeleted ? 200 : 500);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
