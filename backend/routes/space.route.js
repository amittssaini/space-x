const router = require('express').Router();
const {getSpaceData,getPastLaunches}=require('../controllers/space.controller')
router.get('/pastLaunches',getPastLaunches)
router.get('/latest',getSpaceData);

module.exports = router;

