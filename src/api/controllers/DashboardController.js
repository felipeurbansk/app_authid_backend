module.exports = {
    
    index( req, res ) {
        res.send({success: 'entrou', userId: req.userId});
    }

}