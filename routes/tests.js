const router = require('express').Router();
const Test = require('../db/models/test')
const Student = require('../db/models/student')

router.get('/', async (req,res, next) => {
  try {
    const allTests = await Test.findAll();
    res.json(allTests)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const oneTest = await Test.findById(req.params.id)
    if (oneTest) {
      res.json(oneTest)
    } else {
      throw new Error('Not Found')
    }
      } catch (error) {
        next(error)
      }
})

router.post('/student/:studentId', async (req, res, next) => {
  try {
    const currentStudent = await Student.findById(req.params.studentId)
    if (currentStudent) {
      const newTest = await Test.create({
        subject: req.body.subject,
        grade: req.body.grade
      })
      await newTest.setStudent(currentStudent)
      res.status(201).json(newTest)
    } else {
      throw new Error('Not Found')
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const currentTest = await Test.findById(req.params.id)
    if (currentTest) {
      await currentTest.destroy()
      res.status(204).json('No Content')
    } else {
      throw new Error('Not Found')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router;
