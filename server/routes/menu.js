import { Router } from 'express';
import { Dish } from '../models/menu';

const router = Router();

// Route to get all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find().select('-passwordHash').exec();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to add a new dish
router.post('/add', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newDish = new Dish({
      name,
      description,
      price,
      category
    });
    await newDish.save();
    res.json({ message: 'Dish added successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update a dish by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    await Dish.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category
      },
      { new: true }
    ).exec();
    res.json({ message: 'Dish updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete a dish by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dish deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;