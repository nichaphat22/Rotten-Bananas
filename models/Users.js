const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter an password'],
        minlength:[6,'minimum password length is 6 characters']
    },
    gender:{
        type: String,
        required : true
    },
    imgUser:{
        type: String
    }
},{timestamps:true});

//fire a function before doc saved to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// status method to login user
userSchema.statics.login = async function(email,password){
    const users = await this.findOne({email});
    if (users){
        const auth = await bcrypt.compare(password, users.password);
        if (auth){
            return users;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const Users = mongoose.model('users', userSchema);

module.exports = Users;