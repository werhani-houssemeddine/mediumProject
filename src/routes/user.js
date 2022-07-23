const routes = require('express').Router();
const bcrypt = require('bcryptjs');

const { signUp } = require('../validations/user');
const User = require('./../models/users');

routes.post('', async (req, res) => {
    try{
        const {username, password, email} = req.body;
        // check if the inputs are filled in
        if(!username || !password || !email){
            res.status(401);
            return res.json('Please fill in the username, password and email ');
        }

        //validate data 
        await signUp.validateAsync({username, password, email});
        console.log('all data are valid');

        //check if the email is already in the database
        const check_email = await User.findOne({email});
        if(check_email){
            res.status(401);
            return res.json('This email is already taken please try again');
        }

        //before adding a new user to the database, we should hash the password 
        //never save the password in the database without hash.
        const hashPassword = await bcrypt.hash(password, 10);

        //the user is save in the database successfully!
        await User.create({username, password: hashPassword, email});
        res.send('Everything is good, enjoy in our website!');
    }catch(err){
        res.status(400);
        res.send(err.message);
    }
});

module.exports = routes;