// # Import: router and package modules
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// # GET: route for '/api/product'
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        { model: Category},
        { model: Tag }
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// # GET: route for '/api/product:id'
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category},
        { model: Tag }
      ],
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this ID!'})
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// # POST: Route for /api/product
router.post('/', async (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tag_id,
  }) .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
// # PUT: Route for /api/product:id
router.put('/:id', (req, res) => {
  // update product data by searching for it's id
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag

      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      if (req.body.tagIds && req.body.tagIds.length) {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
      res.status(200).json(productTags)
    })
    
    .then((updatedProductTags) => res.status(200).json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(500).json(err);
    });
});

// # DELETE: Route for '/api/product/id'
router.delete('/:id', async (req, res) => {
  try {
    const deleteProductData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
// # CONFIRM: If tag id exists
    if (!deleteProductData) {
      res.status(400).json(({ message: 'No product found with that ID!'}));
      return;
    }
    res.status(200).json(deleteProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
