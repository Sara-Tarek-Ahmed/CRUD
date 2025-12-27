const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const atlasUri = "mongodb+srv://CRUD:2712@cluster0.vvnbe3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(atlasUri)
  .then(() => console.log('✅ Connected Successfully to MongoDB Atlas!'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:');
    console.error(err);
  });

const Task = mongoose.model('Task', {
  title: String,
  completed: { type: Boolean, default: false }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) { res.status(500).send(err); }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const saved = await newTask.save();
    res.json(saved);
  } catch (err) { res.status(500).send(err); }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).send(err); }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) { res.status(500).send(err); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});