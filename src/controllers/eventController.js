const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    // Busca todos os eventos e já os ordena pela data (do mais próximo ao mais distante)
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar eventos.' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, date } = req.body;
    
    // Ajusta a data para o meio-dia para evitar problemas de fuso horário no front-end
    const eventDate = new Date(date);
    eventDate.setHours(12, 0, 0, 0);

    const newEvent = new Event({ title, date: eventDate });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar evento.' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Evento deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar evento.' });
  }
};