const AppError = require('../utils/AppError');


module.exports = async (req, res, next) => {
    console.log('isLoggedIn Middleware', req.cookies)
    const { jwt, __session } = req.cookies;
    // checking if both jwt and session token exists
    if (!jwt || !__session) {
        res.clearCookie('jwt');
        return next(new AppError(401, 'Unauthorized'));
    };
    // decoding base64 encoded __session
    let session = Buffer.from(__session, 'base64').toString();
    // comparing server-assigned token with client token
    if (jwt !== session) {
        res.clearCookie('jwt');
        return next(new AppError(401, 'Unauthorized'));
    };
    next();
};