const express = require('express');
const { objectives_get, objectivesAddNew_post, objectivesUpdateById_put, objectivesDeleteById_delete } = require('../../controllers/objectivesController');

const router = express.Router();

module.exports = router;

/**
 * '/api/objectives' routes:
 */

// GET objectives list
router.get('/', objectives_get);

// POST Add new objective
router.post('/', objectivesAddNew_post);

// PUT Update objective
router.put('/:id', objectivesUpdateById_put);

// DELETE
router.delete('/:id', objectivesDeleteById_delete);
