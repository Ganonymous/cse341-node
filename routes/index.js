const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

router.get('/', (req, res) => res.send('Hello World'));
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
router.use('/contacts', require('./contacts'));

module.exports = router;
