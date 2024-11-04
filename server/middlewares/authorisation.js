

const loginAuth = async (req, res, next) => {
    const token = await req.cookies.token ;
    if (!token ) return res.json({message : 'invalid token'})
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
          }
          req.user = user;
          next();
    })
    next() ;
}

module.exports = loginAuth ;