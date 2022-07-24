const routes = require('express').Router();
const {signIn} = require('../validations/user');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { parseError, sessionizeUser } = require('../util/helpers');


routes.post('', async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400);
            return res.json({error: "Email and password are required"});
        }
        await signIn.validateAsync({email, password});
        console.log('valid data received');

        // first we check for the email if it exists so if  it exist we look for the password
        // and now we check if the user enter the same password .
        const user = await User.findOne({email});
        if(user){
            // here we compare the password 
            const comparePass = await bcrypt.compare(password, user.password);
            if(comparePass) {
                req.session.user = user.id;
                res.send('Enjoining !');
            }
        }
        return new Error('Invalid email or password');
    }catch(err){
        res.status(401);
        res.send(parseError(err));
    }
});

routes.get('', (req, res) => {
    if(!req.session.user) return res.status(401).send('Access denied'); 
    res.send(req.session.user);
});

module.exports = routes;