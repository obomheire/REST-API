import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'

//TYPESCRIPT DEFINATION FOR THE SCHEMA (INTEGRATE MONGOOSE WITH TYPESCRIPT)

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

// CONFIGURE MONGOOSE SCHEMA

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

  // HASHING THE USER PASSWORD

  // Addding a pre-save hook to the mongoose schema

  userSchema.pre("save", async function (next) {
    let user = this as UserDocument;
  
    //only hash the password if it has been modified/changed (or if it is new) 

    if (!user.isModified("password")) { 
      return next();
    }
  
    //Hashing the user password

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  
    const hash = await bcrypt.hashSync(user.password, salt);

    //Replace the user password with the hash password
  
    user.password = hash;
  
    return next();
  });
  
  //COMPARE THE USER PASSWORD WITH THE HASH PASSWORD AT LOGIN

  userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {

    const user = this as UserDocument;
    
  //Return true if the password is correct otherwise return false

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
  };

  const UserModel = mongoose.model('User', userSchema)

  export default UserModel