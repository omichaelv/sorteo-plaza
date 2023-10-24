const express = require('express');
const multer = require('multer');
const {
    createFormData,
    getFormData,
    getSingleFormData,
    updateFormData,
    deleteFormData
} = require('../controllers/formDataController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/formdata', upload.single('factura'), createFormData);
router.get('/formdata', getFormData);
router.get('/formdata/:id', getSingleFormData);
router.put('/formdata/:id', updateFormData);
router.delete('/formdata/:id', deleteFormData);

module.exports = router;