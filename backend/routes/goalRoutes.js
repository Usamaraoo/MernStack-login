const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {
    getGoals,
    postGoals,
    putGoal,
    deleteGoal
} = require('../controllers/goalController')


router.get('/',protect ,getGoals)
router.post('/', protect,postGoals)

// other clean way to write route
// router.route('/:id').put(putGoal).delete('/:id')
router.route('/:id').put(protect,putGoal).delete(protect,deleteGoal)
// router.put('/:id', putGoal)
// router.delete('/:id', deleteGoal)

module.exports = router