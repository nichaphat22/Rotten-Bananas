const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = {email:'', password:''};

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registerd';

    }

    // incorrect password
    if (err.message === 'incorrect password'){
        errors.password = 'that password is not incorrect';
    }

    // duplicate error code
    if (err.code === 11000){
        errors.email = 'that email is already registered';
        return errors;
    }

    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path]= properties.message;
        });
    }

    return errors;
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({ id }, 'nini secret', {
        expiresIn: maxAge
    });
}


module.exports.signup_get = (req, res) => {
    res.render('register');
}
module.exports.login_get = (req, res) => {
    res.render('login');
}
module.exports.signup_post = async (req, res) =>{
    const {username,email, password,gender} = req.body;
    
    try{
       const users= await Users.create({username,email, password,gender});
       const token = createToken(users._id);
       res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
       res.status(201).json({users: users._id});
    }
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.login_post = async (req, res) =>{
    const {email, password} = req.body;

   try {
    const users = await Users.login(email, password);
    const token = createToken(users._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
    res.status(200).json({users: users._id ,email: users.email})

    
   }
   catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
   }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}
