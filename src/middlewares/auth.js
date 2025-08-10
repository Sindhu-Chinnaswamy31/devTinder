const adminAuth = (req, res, next) => {
    const token = req.query.token;
    const isAuthorised =  token === "admin";
    if(!isAuthorised){
        res.status(403).send("unauthorised");
    }else{
        next();
    }
}

const userAuth = (req, res, next) => {
    const token = req.query.token;
    const isAuthorised =  token === "user";
    if(!isAuthorised){
        res.status(403).send("unauthorised");
    }else{
        next();
    }
}


module.exports = 
{
    adminAuth,
    userAuth
}