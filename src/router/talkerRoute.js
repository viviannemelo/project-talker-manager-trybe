const { Router } = require('express');

// const fs = require('fs').promises;
const { readFile } = require('../utils/readFile');
const { writeFile } = require('../utils/writeFile');

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../utils/validations');

const talkerRoute = Router();

talkerRoute.get('/', async (_req, res) => {
    try {
      const talkers = await readFile();
      return res.status(200).json(talkers);
    } catch (e) {
      res.status(500).send({ message: `${e}` });
    }
});

talkerRoute.get('/search', async (req, res) => {
  res.status(200).json({ message: 'search' });
});

talkerRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('id', id);
    const talkers = await readFile();
    const talkerId = talkers.find((talker) => talker.id === +id);
    if (talkerId) {
        return res.status(200).json(talkerId);
    } 
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talkerRoute.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerId = talkers.findIndex((talker) => talker.id === Number(id));

  talkers.splice(talkerId, 1);
  await writeFile(talkers);
  res.status(204).end();
});

talkerRoute.use(validateToken);
talkerRoute.use(validateName); 
talkerRoute.use(validateAge);
talkerRoute.use(validateTalk);
talkerRoute.use(validateWatchedAt);
talkerRoute.use(validateRate); 

talkerRoute.post('/', async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talker = await readFile();
  const newIdTalker = talker.length + 1;
  const newTalker = {
    id: newIdTalker,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  
  await writeFile([...talker, newTalker]);
  return res.status(201).json(newTalker);
});

talkerRoute.put('/:id', validateToken, validateName, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  
  const talkers = await readFile();
  const talkerId = talkers.findIndex((talker) => talker.id === Number(id));

  if (talkerId >= 0) {
    talkers[talkerId] = { id: Number(id), name, age, talk };
    writeFile(talkers);
    return res.status(200).json(talkers[talkerId]);
  } 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = talkerRoute;