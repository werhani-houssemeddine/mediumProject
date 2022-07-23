const Joi = require('joi');

const email = Joi.string().email().required();
const username = Joi.string().alphanum().min(3).max(30).required();

const message = `
    must be between 6-16 characters, have at least one capital letter,
    one lowercase letter, one degit, and one special letter character.
`;

const password = Joi.string().required();

module.exports = {
    signUp: Joi.object({username, password, email}),
    signIn: Joi.object({email, password})
}