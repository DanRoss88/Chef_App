import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: { type: String, enum: ['appetizers', 'main_course', 'desserts', 'sides'], default: 'main_course' },
  ingredients: [{
    type: String
  }],
  allergens: [{
    type: String
  }],
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Dish = mongoose.model('Dish', menuSchema);
export default Dish;