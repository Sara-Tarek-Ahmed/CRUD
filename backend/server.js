const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crud_db');

const Task = mongoose.model('Task', {
  title: String,
  completed: Boolean
});

app.get('/api/tasks', async (req, res) => res.send(await Task.find()));
app.post('/api/tasks', async (req, res) => res.send(await new Task(req.body).save()));
app.put('/api/tasks/:id', async (req, res) => res.send(await Task.findByIdAndUpdate(req.params.id, req.body)));
app.delete('/api/tasks/:id', async (req, res) => res.send(await Task.findByIdAndDelete(req.params.id)));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));