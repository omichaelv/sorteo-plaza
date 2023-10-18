const express = require('express');
const {
    createFormData,
    getFormData,
    getSingleFormData,
    updateFormData,
    deleteFormData
} = require('../controllers/formDataController');

const router = express.Router();

router.post('/formdata', createFormData);
router.get('/formdata', getFormData);
router.get('/formdata/:id', getSingleFormData);
router.put('/formdata/:id', updateFormData);
router.delete('/formdata/:id', deleteFormData);

module.exports = router;