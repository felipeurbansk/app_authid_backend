const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth.json');

module.exports = {
    
    async create_user( user ) {
        const { email } = user;

        try {

            if ( await User.findOne( {email} ) ) return { error:  'E-mail already exists.' }

            const user_create = await User.create(user);

            user_create.password = undefined;
            
            return {user: user_create, token: await createToken( user_create.id )};
        } catch (err) {
            return { error: 'Registration failed.', err }
        }
    },

    async auth( user ) {

        const { email, password } = user;

        try {
            const userAutheticate = await User.findOne({email}).select(['name', 'email', 'password']);

            if ( !userAutheticate ) 
                return { error: 'User not found.'}  

            if ( !await bcrypt.compare(password, userAutheticate.password) )
                return { error: 'Invalid password' }

            userAutheticate.password = undefined;

            return {user: userAutheticate, token: await createToken( userAutheticate.id )};

        } catch(err) {
            console.log({err})
            return {error: 'Authenticate failed.', err}
        }

    }

}

async function createToken( id ) {
    return await jwt.sign( {id}, authConfig.secret, {
        expiresIn: 86400
    });
}