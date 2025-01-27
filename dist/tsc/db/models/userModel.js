"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
// Number of salts to the password
const SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    preferences: JSON,
});
UserSchema.pre("save", function (next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password"))
        return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
// Function that gets a hashed password and an unhashed passwored. Returns true if it is the correct password
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=userModel.js.map