import { model, Schema } from "mongoose";
import { UserDocument } from "../types/user.interface";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = new Schema<UserDocument>({
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [validator.isEmail, "email is invalid"],
        createIndexes: { unique: true }
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        minlength: 5,
        maxlength: 20,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 8,
        select: false
    }
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcryptjs.genSalt(10)
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    }
    catch (err) {
        console.error("Error hashing password:", err);
        return next(err as Error);
    }
});

userSchema.methods['validatePassword'] = function (password: string) {
    return bcryptjs.compare(password, this['password']);
}
export default model<UserDocument>("User", userSchema);