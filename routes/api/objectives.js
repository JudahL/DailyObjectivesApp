const express = require('express');
const { objectives_get, objectivesAddNew_post, objectivesUpdateById_put, objectivesDeleteById_delete } = require('../../controllers/objectivesController');

const router = express.Router();

module.exports = router;

/**
 * '/api/objectives' routes:
 */

router.get('/', objectives_get);

router.post('/', objectivesAddNew_post);

router.put('/:id', objectivesUpdateById_put);

router.delete('/:id', objectivesDeleteById_delete);

