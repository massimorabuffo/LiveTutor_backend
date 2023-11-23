import express from 'express';
import morgan from 'morgan';
import "express-async-errors";
const app = express();
app.use(morgan('dev'));
const port = 3000;
let elements = [{ id: 1, title: 'todo_1' }, { id: 2, title: 'todo_2', completed: false }];
app.get('/api/todos', (req, res) => {
    res.status(200).json(elements);
});
app.delete("/api/todo/:id", (req, res) => {
    const { id } = req.params;
    if (id) {
        res.status(400).json({ message: "erro id is null or undefined" }).end();
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
