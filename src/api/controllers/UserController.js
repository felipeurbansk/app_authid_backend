
const UserService = require('../services/UserService')

module.exports = {

    async create( req, res ) {

        const {name, email, password, confirmPassword} = req.body;

        if ( !name )     return res.status(401).json({error: 'Nome não informado.'});
        if ( !email )    return res.status(401).json({error: 'E-mail não informado.'});
        if ( !password ) return res.status(401).json({error: 'Senha não informado.'});

        try {

            const user = await UserService.create_user(req.body);

            if ( user.error ) return res.status(401).json(user);

            return res.send(user);
            
        } catch(err) {
            return res.status(400).json({error: 'UserService not working.', err});
        }

    },

    async auth( req, res ) {
        const { email, password } = req.body;

        if ( !email ) return res.status(401).json({ error: 'E-mail não informado.' })
        if ( !password ) return res.status(401).json({ error: 'Senha não informado.' })

        try {

            const auth = await UserService.auth( {email, password} );
            
            if ( !auth ) return res.status(500).json( {error: "Usuário não encontrado"} )
            
            if ( auth.error ) return res.status(401).json( auth );


            return res.send(auth)

        } catch(err) {
            console.log({err})
            return res.status(500).json({error: "UserController error auth.", err})
        }

    }

}