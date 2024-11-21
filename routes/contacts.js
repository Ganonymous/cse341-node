const router = require('express').Router();
const utilities = require("../utilities");
const validate = require('../utilities/validation.js');


const contactsController = require('../controllers/contacts');

router.get('/', utilities.handleErrors(contactsController.getAll));

router.get('/:id', 
    validate.idRule(),
    validate.checkId,
    utilities.handleErrors(contactsController.getSingle));

router.post('/', 
    validate.contactRules(),
    validate.checkContact,
    utilities.handleErrors(contactsController.createContact));

router.put('/:id', 
    validate.idRule(),
    validate.checkId,
    validate.contactRules(),
    validate.checkContact,
    utilities.handleErrors(contactsController.updateContact));

router.delete('/:id', 
    validate.idRule(),
    validate.checkId,
    utilities.handleErrors(contactsController.deleteContact));

module.exports = router;
