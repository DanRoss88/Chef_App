import express from 'express';
const router = express.Router();
import Dish from '../models/Dish';

router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find().select('-password');
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/add', authenticateToken, async (req, res) => {
  try {
    const newDish = await new Dish(req.body).save();
    res.json(newDish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/edit/:id', authenticateToken, async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


export default router;