const jwt = require('jsonwebtoken');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const verifyJwt = (username) =>{
    try{
        const token = localStorage.getItem(`${username}`);
        if(!token) return res.status(401).json({message: 'no token provided'})
        const verify = jwt.verify(token, "access");
        if(!verify){
            return false;
        }
        return verify;
    } catch(err){
        res.status(400).json({message: 'unauthorized'})
    }
}


module.exports = verifyJwt;