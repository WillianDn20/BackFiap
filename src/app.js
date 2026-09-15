const express = require('express');
const cors = require('cors'); 
const app = express();

const postRoutes = require('./routes/postRoutes'); 
const userRoutes = require('./routes/userRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const eventRoutes = require('./routes/eventRoutes'); 

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong! Servidor online.' });
});

app.use('/posts', postRoutes);
app.use('/notices', noticeRoutes); 
app.use('/events', eventRoutes); 
app.use('/', userRoutes); 

module.exports = app;