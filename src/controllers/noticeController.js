const Notice = require('../models/Notice');

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }); // Traz os mais recentes primeiro
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar avisos.' });
  }
};

exports.createNotice = async (req, res) => {
  try {
    const { text, author } = req.body;
    const newNotice = new Notice({ text, author });
    const savedNotice = await newNotice.save();
    res.status(201).json(savedNotice);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar aviso.' });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Aviso deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar aviso.' });
  }
};