import mongoose, { mongo } from "mongoose";
import bcrypt, { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
// ☕︎ User Schema Create ☕︎ //

// ☕︎ Profile Schema ☕︎ //
const profileSchema = new mongoose.Schema({
    url : {
        type : String,
        required : [true , "The Profile Url is required"]
    },
    public_id : {
        type : String,
    }
})
const userSchema = new mongoose.Schema({
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
    minlength : [8 , "The Password length must be at least 8 charcater"],
    validate : {
        validator : function(v){
            return /[a-zA-Z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v);
        },
        message : 'Password must contain at least one letter, one number, and one special character.'
     }
    },
    profile : profileSchema
},{
    timestamps : true 
});

//-------------------------- Methods -----------------------// 

// ☕︎ Password Hashing ☕︎ //
userSchema.pre("save" , async function(next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password , 10);
  next();
})

// ☕︎ Compare Password ☕︎ //
userSchema.methods.isPasswordValid = async function(oldPassword) {
    return await bcrypt.compare(oldPassword , this.password)
}
 
// ☕︎ Generates JWT Auth Token ☕︎ //
userSchema.method.generateAuthToken = async function() {
    const token = jwt.sign({ id : this._id} , process.env.JWTSECRETKEY)
    return token;
}

// ☕︎ User Model ☕︎ //
const UserModel = mongoose.model("Users" , userSchema);

export default UserModel;


