const catchAsync = require('../utils/catchAsync');
const signJwtToken = require('../helpers/signJwtToken');
const { UserInfo } = require('../models/index');


// login
exports.login = catchAsync(async (req, res, next) => {
    const { email, password, remember } = req.body;

    console.log(email, password)

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError(400, 'Please provide email and password!'));
    };

    // 2) Check if user exists && password is correct
    const user = await UserInfo.findOne({ where: { email }, attributes: ["id", "password"] });

    // 3) if everything is ok sign and send token in cookie
    const token = signJwtToken(user.id);

    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });

    // req.secure || req.headers['x-forwarded-proto'] === 'https',

    user.password = undefined;

    res.status(200).send({ status: "success", token, data: user });
});

exports.register = catchAsync(async (req, res, next) => {

});