import mongoose from 'mongoose';
import 'dotenv/config'

const mongo = process.env.MONGODB_URI;

const mongoDB = mongoose.connect(mongo)

  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('MongoDB connection error:', err));

export default mongoDB;