const router = require('express').Router();
const Student = require('../db/models/student')

router.get('/', async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.json(allStudents)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const oneStudent = await Student.findById(req.params.id)
    if (oneStudent) {
      res.json(oneStudent)
    } else {
      throw new Error('Not Found')
    }
      } catch (error) {
        next(error)
      }
})

router.post('/', async (req, res, next) => {
  try {
  const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
  })
  res.status(201).json(newStudent)
  } catch(error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const currentStudent = await Student.findById(req.params.id)
    const updatedStudent = await currentStudent.update(req.body, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })
    res.json(updatedStudent)
    } catch(error) {
      next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const currentStudent = await Student.findById(req.params.id)
    await currentStudent.destroy()
    res.status(204).send('No Content')
    } catch(error) {
      next(error)
    }
})

module.exports = router;
