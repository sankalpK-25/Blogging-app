
const {validateToken} = require("../services/authentication")

function checkForAuthenticationCookie(cookieName){
    return (req,res,next) => {
        const cookieValue = req.cookies[cookieName];
        
        if(!cookieValue) {
            return next();
        }

        try{
            const user = validateToken(cookieValue);
            req.user = user;  
        }catch(e){
            req.user = null;
        }

        return next();
    }
}

module.exports = {
    checkForAuthenticationCookie,
}