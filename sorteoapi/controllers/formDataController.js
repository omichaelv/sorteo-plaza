const FormData = require('../models/FormData');

exports.createFormData = async (req, res) => {
    try {
        const base64Image = req.file.buffer.toString('base64');
        
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
        const data = await FormData.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

exports.getSingleFormData = async (req, res) => {
    try {
        const data = await FormData.findByPk(req.params.id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "Entry not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
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