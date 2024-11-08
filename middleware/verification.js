require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

class Verification{
    static generateJwt(payload){
        const token = jwt.sign(payload,jwtSecret,{expiresIn:"3d"});
        return token;
    }

    static generateRefreshToken(payload){
        const refresh_token = jwt.sign(payload,refreshSecret,{expiresIn:"7d"})
        return refresh_token;
    }

    static tokenVerification(token,type){
        const secret = type == "jwt" ? jwtSecret : refreshSecret;
        try{
            const payload = jwt.verify(token,secret);
            return payload;
        }
        catch(err){
            return { valid: false, error: err.message };  
        }
    }
    static updatePayload(payload){
        return {
            name : payload.name,
            email : payload.email
        }
    }
    
    static verifyJwt(jwtToken, refreshToken) {
        const jwtPayload = this.tokenVerification(jwtToken, "jwt");
        const refreshPayload = this.tokenVerification(refreshToken, "refresh");
    
        if (jwtPayload && refreshPayload) {
            return {
                message: "valid user",
                credentials: {
                    payload: this.updatePayload(jwtPayload),
                    jwtToken: jwtToken,
                    refreshToken: refreshToken,
                },
            };
        }
    
        // Case where refresh token is valid but jwt token is invalid or missing
        if (!jwtPayload && refreshPayload) {
            const newPayload = {
                name: refreshPayload.name,
                email: refreshPayload.email,
            };
            const newJwtToken = this.generateJwt(newPayload);
            return {
                message: "valid user",
                credentials: {
                    payload: this.updatePayload(refreshPayload),
                    jwtToken: newJwtToken,
                    refreshToken: refreshToken,
                },
            };
        }
    
        // Case where jwt token is valid but refresh token is invalid or missing
        if (jwtPayload && !refreshPayload) {
            const newPayload = {
                name: jwtPayload.name,
                email: jwtPayload.email,
            };
            const newRefreshToken = this.generateRefreshToken(newPayload);
            return {
                message: "valid user",
                credentials: {
                    payload: this.updatePayload(jwtPayload),
                    jwtToken: jwtToken,
                    refreshToken: newRefreshToken,
                },
            };
        }
    
        return false;
    }    

    static authMiddleware = (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const payload = this.tokenVerification(token, 'jwt');
        if (payload.valid === false) {
            return res.status(403).json({ message: 'Invalid token', error: payload.error });
        }
        
        req.user = payload; 
        next();
    }
}
module.exports = Verification