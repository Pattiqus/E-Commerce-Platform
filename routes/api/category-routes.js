const router = require('express').Router();
const { Category, Product } = require('../../models');


// # GET: route for '/api/categories'
router.get('/', async (req, res) => {
  try {
    // # Find: Categories & associated products
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// # GET: route for '/api/categories/:id'
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model : Product}],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID!'});
      return;
    } 
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// # POST: Create new category
router.post('/', async (req, res) => {
  try {
    const newCategoryData = await Category.create(
      {id: req.params.id ,
        category_name: req.body.category_name}
    );
    res.status(200).json(newCategoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// # PUT: Update an existing category based on its ID
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (!updateCategory) {
      res.status(400).json({ message: 'No category found with this ID!'});
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// # Delete: remove a category based on its ID
router.delete('/:id',async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with this ID!'});
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
