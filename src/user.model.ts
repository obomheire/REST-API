import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserInput {
    email: string;
    name: string;
    password: string;
  }

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      password: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  const UserModel = mongoose.model('User', userSchema)

  export default UserModel