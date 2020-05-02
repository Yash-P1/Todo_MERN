const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    title: String,
    task: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;