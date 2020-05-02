const express = require('express');

const router = express.Router();

const Todo = require('../models/toDo');

// Routes
router.get('/', (req, res) => {

    Todo.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.post('/save', (req, res) => {
    const data = req.body;
    console.log("Body", data);

    const newTodo = new Todo(data);

    newTodo.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // Todo
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});

module.exports = router;