const objectivesLists = require('../domain/objectivesLists');

/**
 * GET
 * Find users objectives list based on session id and return the objectives in the response
 */
exports.objectives_get = function (req, res, next) {

  objectivesLists.getObjectivesListByUserId((req.session && req.session.userId) || null)
    .then(objectives => res.json(objectives))
    .catch(err => next(err));

};

/**
 * POST
 * Add a new objective to users objectives list and return the objective in the response if successful
 */
exports.objectivesAddNew_post = function (req, res, next) {

  objectivesLists.addNewObjective((req.session && req.session.userId) || null, req.body)
    .then(objective => res.json(objective))
    .catch(err => next(err));

};

/**
 * PUT
 * Update an existing objective in users objectives list and return the modified objective in the response if successful
 */
exports.objectivesUpdateById_put = function (req, res, next) {

  objectivesLists.updateObjective((req.session && req.session.userId) || null, req.params.id, req.body)
    .then(objective => res.json(objective))
    .catch(err => next(err));

};

/**
 * DELETE
 * Remove an existing objective in users objectives list and return the string 'success' in the response if successful
 */
exports.objectivesDeleteById_delete = function (req, res, next) {

  objectivesLists.deleteObjective((req.session && req.session.userId) || null, req.params.id)
    .then(result => res.send(result))
    .catch(err => next(err));

};
