import express from 'express';
import Student from '../models/studentSchema.js'
const router = express.Router();


// Add Student
router.post('/', async (req, res) => {
  const { name, studentId, email } = req.body;
  try {
    const student = new Student({ name, studentId, email });
    await student.save();
    res.status(201).send('Student added');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Edit Student
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, studentId, email } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(id, { name, studentId, email }, { new: true });
    if (!student) return res.status(404).send('Student not found');
    res.send('Student updated');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete Student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) return res.status(404).send('Student not found');
    res.send('Student deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default  router;
