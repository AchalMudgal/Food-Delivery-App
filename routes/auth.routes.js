const authController = require("../controller/auth.controller");
const {verifySignup} = require("../middleware");

module.exports = (app) => {
    //signup
    app.post("/foodDeliveryApp/api/v1/auth/signup",[verifySignup.validateSignupRequestBody],authController.signup);
    //signin
    app.post("/foodDeliveryApp/api/v1/auth/signin",[verifySignup.validateSignInRequestBody],authController.signin);
};
