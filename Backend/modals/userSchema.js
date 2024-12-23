 


import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required!"],
        minLength: [3, "First Name must contain at least 3 characters!"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required!"],
        minLength: [3, "Last Name must contain at least 3 characters!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        validate: [validator.isEmail, "Provide a valid email!"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required!"],
        minLength: [11, "Phone number must contain exactly 11 digits!"],
        maxLength: [11, "Phone number must contain exactly 11 digits!"],
    },
    nic: {
        type: String,
        required: [true, "NIC is required!"],
        minLength: [13, "NIC must contain 13 digits!"],
        maxLength: [13, "NIC must contain 13 digits!"],
    },
    dob: {
        type: Date,
        required: [true, "Date of Birth is required!"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
        default: "Male",
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [8, "Password must contain at least 8 characters!"],
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
        
    },
    doctorDepartment: {
        type: String,
        default: null,
    },
    docAvator: {
        public_id: { type: String, default: null },
        url: { type: String, default: null },
    },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT
userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema);
