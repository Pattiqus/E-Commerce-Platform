const router = require('express').Router();
const res = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');


// # GET: route for '/api/tags' , all data
router.get('/', async (req, res) => {
  try {
    const allTagData = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(allTagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// # GET: route for '/api/tags:id' , search by ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {  
      include : [
        { model: Product}],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag matches that ID!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const createTagData = await Tag.create({
      id: req.params.id ,
        tag_name: req.body.tag_name,
    });
    res.status(200).json(createTagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// # PUT: route for '/api/tags:id' , Updates a tag
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (!updateTag) {
      res.status(404).json({ message: 'No tag fouund with this ID!'})
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag found with that ID!'});
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
