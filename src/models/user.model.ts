import { Schema, Document, model, Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { NextFunction } from 'express';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  lastLogin?: Date;
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['Customer', 'Admin'],
      default: 'Customer',
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  hash(user.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function(password: string) {
  const passwordHash = this.password;

  return new Promise((resolve, reject) => {
    compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

export const User: Model<IUser> = model<IUser>('user', userSchema);
