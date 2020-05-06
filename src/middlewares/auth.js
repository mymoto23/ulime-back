import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;
    if (!token) {
        return res.status(403).json({
            verified: false,
            message: 'token does not exist'
        })
    }
    try {
        const p = new Promise((resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if (err) return res.status(403).json({verified: false, err});
                else {
                    req.decoded = decoded;
                    next();
                    // resolve(decoded);
                }
            })
        });
    } catch (e) {
        return res.status(403).json({
            verified: false,
            message: e.message
        })
    }
}

// export const verifyUserData = (req, res, next) => {
    // const {username, password, } = req.body;
// }