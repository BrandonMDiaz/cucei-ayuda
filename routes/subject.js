/**
 * @Author: schwarze_falke
 * @Date:   2018-10-07T22:23:28-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-07T22:55:26-05:00
 */

/*
 * Definition of subject routing
 */

const { Router } = require('express');

const middleWares = require('../middlewares');

const { subjectCtrl } = require('../controllers');
// const middleWares = require('../middlewares');

const router = Router();

/**
  * These are all the GET methods for the subjects.
  * GET /subject
  * GET /subject/:subjectId
  * GET /subject/:subjectId/subjects
  */

// GET /subject  Returns all subjects
router.get('/', subjectCtrl.getAll);

// GET /subject/:subjectId    returns specific subject
router.get('/:nrc', subjectCtrl.getSubject);

// GET /subject/:subjectId/subjects
// Returns all subjects of a method
// router.get('/:subjectId/subjects', ());

// POST /subject
// [middleWares.subjectM.validateNrc, middleWares.subjectM.validateName, middleWares.subjectM.validateFirstDay, middleWares.subjectM.validateSecDay, middleWares.subjectM.validateSection, middleWares.subjectM.validateClass, middleWares.subjectM.validateCR, middleWares.subjectM.validateBuilding, middleWares.subjectM.validateTeacher],
router.post('/', subjectCtrl.insert);

// PUT /subject/:subjectId
router.put('/:nrc', [middleWares.subjectM.validateNrc, middleWares.subjectM.validateName, middleWares.subjectM.validateFirstDay, middleWares.subjectM.validateSecDay, middleWares.subjectM.validateSection, middleWares.subjectM.validateClass, middleWares.subjectM.validateCR, middleWares.subjectM.validateBuilding, middleWares.subjectM.validateTeacher], subjectCtrl.update);

// DELETE /subject/:subjectId
router.delete('/:nrc', subjectCtrl.del);

module.exports = router;