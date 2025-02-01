import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// ☕︎ User Schema Create ☕︎ //

// ☕︎ Profile Schema ☕︎ //
const profileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "The Profile Url is required"],
  },
  public_id: {
    type: String,
  },
});
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "FullName is required"],
      trim: true,
      minlength: [5, "The FullName must be at leats 5 character"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: "Enter Valid Email Address...",
      },
    },
    password: {
      type: String,
      required: [true, "The Passsword is required"],
      minlength: [8, "The Password length must be at least 8 charcater"],
      validate: {
        validator: function (v) {
          return (
            v.length >= 8 &&
            v.length <= 20 && // Length between 8 and 20 characters
            /[A-Z]/.test(v) && // At least one uppercase letter
            /[a-z]/.test(v) && // At least one lowercase letter
            /\d/.test(v) && // At least one number
            /[!@#$%^&*(),.?":{}|<>]/.test(v)
          ); // At least one special character
        },
        message:
          "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    verified: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    verificationToken : {
      type : String
    },
    profile: profileSchema,
  },
  {
    timestamps: true,
  }
);

//-------------------------- Methods -----------------------//

// ☕︎ Password Hashing ☕︎ //
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ☕︎ Compare Password ☕︎ //
userSchema.methods.isPasswordValid = async function (oldPassword) {
  return await bcrypt.compare(oldPassword, this.password);
};

// ☕︎ Generates JWT Auth Token ☕︎ //
userSchema.method.generateAuthToken = async function () {
  const token = jwt.sign({ id: this._id }, process.env.JWTSECRETKEY);
  return token;
};

// ☕︎ User Model ☕︎ //
const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
