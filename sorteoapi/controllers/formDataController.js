const FormData = require('../models/FormData');
const sharp = require('sharp');

exports.createFormData = async (req, res) => {
    try {
        const compressedImageBuffer = await sharp(req.file.buffer)
            .resize({
                width: 1280, 
                height: 720,
                fit: 'inside', 
            })
            .jpeg({
                quality: 80, 
            })
            .toBuffer();

        const base64Image = compressedImageBuffer.toString('base64');
        
        const formData = {
            ...req.body,
            factura: base64Image
        };

        const data = await FormData.create(formData);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

exports.getFormData = async (req, res) => {
    try {
        const data = await FormData.findAll({
            attributes: { exclude: ['factura'] } 
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

exports.getSingleFormData = async (req, res) => {
    try {
        const data = await FormData.findByPk(req.params.id);
        if (data) {
            // Send a success response with status and data
            res.status(200).json({ status: 200, data });
        } else {
            // Send a not found response with status and message
            res.status(404).json({ status: "error", message: "Entry not found" });
        }
    } catch (error) {
        // Send an error response with status and error message
        res.status(500).json({ status: "error", message: "Error: " + error.message });
    }
};

exports.updateFormData = async (req, res) => {
    try {
        const data = await FormData.findByPk(req.params.id);
        if (data) {
            let updatedData = req.body;
            if (req.file) {
                const base64Image = req.file.buffer.toString('base64');
                updatedData = {
                    ...req.body,
                    factura: base64Image
                };
            }
            
            await data.update(updatedData);
            res.status(200).json({ message: "Entry updated successfully" });
        } else {
            res.status(404).json({ message: "Entry not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

exports.deleteFormData = async (req, res) => {
    try {
        const data = await FormData.findByPk(req.params.id);
        if (data) {
            await data.destroy();
            res.status(200).json({ message: "Entry deleted successfully" });
        } else {
            res.status(404).json({ message: "Entry not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};