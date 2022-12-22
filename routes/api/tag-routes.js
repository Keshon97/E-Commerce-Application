const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll(
  {
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
  .then(tag => {
    if(!tag) {
      res.status(404).json({message: 'No tag with that id.'})
      return;
    }
    res.status(200).json(tag);
  })
    .catch((err) => res.status(404).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(
    {
      tag_name: req.body.tag_name
    }
  )
  .then((tag) => 
    res.status(200).json(tag))
  .catch((err) => 
    res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      }
    },
  )
  .then(tag => {
    if(!tag) {
      res.status(404).json({message: 'No tag with that id.'})
      return;
    }
    res.status(200).json(tag);
  })
    .catch((err) => 
      res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
  .then(tag => {
    if(!tag) {
      res.status(404).json({message: 'No tag with that id.'})
      return;
    }
    res.status(200).json(tag);
  })
    .catch((err) => 
      res.status(400).json(err));
});

module.exports = router;
