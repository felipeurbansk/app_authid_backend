const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = ( req, res, next) => {

    const authUser = req.headers.authorization;

    if ( !authUser ) return res.status(403).json( {error: 'Token not found.'} )

    const parts = authUser.split(' ');

    if ( !parts.length === 2) return res.status(401).json( {error: 'Token error.'} )

    const [ scheme, token ] = parts;

    console.log({scheme})

    if ( !/^Bearer$/i.test(scheme))
        return res.status(401).json({error: 'Bad format token.'});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if ( err )
            return res.status(401).json({error: 'Token invalid.'});

        req.userId = decoded.id;

        return next();
    })

}