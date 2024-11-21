const {body, param, validationResult} = require('express-validator');
const validate = {};

validate.idRule = () => {
    return [param('id').exists().isHexadecimal().isLength({min:24, max:24})];
}

validate.checkId = (req, res, next) => {
    let errors = [];
    errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new Error('Invalid Id format');
    }
    next();
}

validate.contactRules = () => {
    return [
        body('firstName')
        .trim()
        .escape()
        .isLength({min: 1})
        .withMessage("Please provide a first name."),
        body('lastName')
        .trim()
            .escape()
            .isLength({min: 2})
            .withMessage("Please provide a last name."),
        body('email')
            .trim()
            .escape()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required."),
        body('favoriteColor')
            .trim()
            .escape()
            .isLength({min: 1})
            .withMessage("Please provide a fiavorite color."),
        body('birthday')
            .trim()
            .escape()
            .isLength({min: 1})
            .withMessage("Please provide a birthday.")
    ]
}

validate.checkContact = (req, res, next) => {
    let errors = [];
    errors = validationResult(req);
    if(!errors.isEmpty()) {
        const errorString = errors.errors.map((error) => {return `${error.path}`}).join(', ');
        throw new Error(`Invalid contact fields: ${errorString}`);
    }
    next();
}

module.exports = validate;