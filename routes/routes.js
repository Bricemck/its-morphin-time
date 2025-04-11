// CREATE - POST - /pets
app.post('/rangers', async (req, res) => {
    const creataRanger = await Ranger.create(req.body);
    res.json(createaRanger)
  });