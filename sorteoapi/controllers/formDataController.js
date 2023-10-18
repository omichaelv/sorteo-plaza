const FormData = require('../models/FormData');

exports.createFormData = async (req, res) => {
    try {
        const data = await FormData.create(req.body);
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
            await data.update(req.body);
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