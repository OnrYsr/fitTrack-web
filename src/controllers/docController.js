const Doc = require('../models/Doc');

exports.getAllDocs = async (req, res) => {
  try {
    const docs = await Doc.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Dökümanlar alınamadı', error: err.message });
  }
};

exports.createDoc = async (req, res) => {
  try {
    const { type, title, content } = req.body;
    const newDoc = new Doc({ type, title, content });
    await newDoc.save();
    res.status(201).json({ message: 'Döküman eklendi', doc: newDoc });
  } catch (err) {
    res.status(500).json({ message: 'Döküman eklenemedi', error: err.message });
  }
};

exports.getDocsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const filtered = await Doc.find({ type });
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: 'Filtreli dökümanlar alınamadı', error: err.message });
  }
}; 