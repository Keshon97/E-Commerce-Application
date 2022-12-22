const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      Product
    ],
  })
    .then((category) => 
      res.json(category))
    .catch((err) => 
      res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    include: [Product],
  })
  .then(category => {
    if(!category) {
      res.status(404).json({message: 'No category with that id.'})
      return;
    }
    res.status(200).json(category);
  })
  .catch((err) => 
    res.status(400).json(err));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(
    {
      category_name: req.body.category_name
    }
  )
  .then((category) => 
    res.status(200).json(category))
  .catch((err) => 
    res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      }
    },
  )
  .then(category => {
    if(!category) {
      res.status(404).json({message: 'No category with that id.'})
      return;
    }
    res.status(200).json(category);
  })
    .catch((err) => 
      res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id,
      }
    })
  .then(category => {
    if(!category) {
      res.status(404).json({message: 'No category with that id.'})
      return;
    }
    res.status(200).json(category);
  })
  .catch((err) => 
    res.status(400).json(err));
});

module.exports = router;
