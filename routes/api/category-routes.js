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
    const categoryData = await Category.create(
      {category_name: req.body.category_name}
    );
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// # PUT: Update an existing category based on its ID
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
