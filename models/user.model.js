const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    googleId:{
        type: String,
    },
})

userSchema.pre(
    'save',
    async function (next) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);

userSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
  }


const userModel = mongoose.model('users', userSchema)
module.exports = userModel