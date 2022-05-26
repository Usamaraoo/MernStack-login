const {
    request
} = require('express')
const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')
//@desc get goals
// @route /api/goals/:id
// @access Private
const getGoals = async (req, res) => {
    const user = req.user

    const goals = await Goal.find({
        user: user.id
    })

    res.status(200).json(goals)

}

const postGoals = asyncHandler(async (req, res) => {
    const user = req.user
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: user.id
    })

    res.status(200).json(goal)

})

const putGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }


    // Check the request user
    if (!req.user) {
        res.status(400)
        throw new Error("User no found")
    }

    //Check the request user match to the goal, he is updating 
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("You are not authorized to update someone's else goal")

    }
    const updatedgoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedgoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal doesn't exist")
    }
    // Check the request user
    if (!req.user) {
        res.status(400)
        throw new Error("User no found")
    }
    //Check the request user match to the goal, he is deleting 
    if (goal.user.toString() !== req.user.id) {
        res .status(401)
        throw new Error("You are not authorized to delete someone's else goal")
    }

    await goal.remove()
    res.status(200).json({
        Goal: `Goal ${req.params.id} Deleted`
    })

})
module.exports = {
    getGoals,
    postGoals,
    putGoal,
    deleteGoal
}