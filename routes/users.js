import express from 'express';
import User from '../models/userSchema.js'
const router = express.Router();
import { configDotenv } from "dotenv";
// Block/Unblock User
router.patch('/:id/block', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send('User not found');
    user.blocked = !user.blocked;
    await user.save();
    res.status(200).send(user.blocked ? 'User blocked' : 'User unblocked');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
