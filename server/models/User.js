import * as mongoose from 'mongoose';

class IUser extends mongoose.Document {
    username
    email
    passwordHash
    role;
  }

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['chef', 'admin'], default: 'chef' }
  });

  export const User = mongoose.model<IUser>('User', userSchema);