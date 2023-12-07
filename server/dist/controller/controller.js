var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../db.js";
import { toDoCreateScheme } from '../validation.js';
export const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield db.manyOrNone(`SELECT * FROM todos;`);
    return res.status(200).json(todos);
});
export const createTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const data = req.body;
    const validate = toDoCreateScheme.validate(data);
    console.log(data);
    if (validate.error) {
        return res.status(400).json({ message: "error todos not created succesfully" });
    }
    const { title, completed } = data;
    console.log(completed);
    const newTodos = yield db.none(`
    INSERT INTO todos(title, completed) VALUES($1, $2);`, [
        title, completed
    ]);
    return res.status(200).json({ message: `todos created` });
});
export const deleteTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "erro id is null or undefined" });
    }
    const deletedTodos = yield db.oneOrNone(`
  DELETE FROM todos WHERE id=$1 RETURNING *`, Number(id));
    if (!deletedTodos) {
        return res.status(400).json({ message: `'${id}' does not exist as ID` });
    }
    return res.status(200).json({ message: `'${id}' corrisponding todos deleted` });
});
export const modifyTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, completed } = req.body;
    if (!id) {
        return res.status(400).json({ message: "erro id is null or undefined" });
    }
    const updatedId = yield db.oneOrNone(`UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *`, [title, completed, id]);
    if (updatedId) {
        return res.status(200).json({ msg: "Todo was updated." });
    }
});
export const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    console.log(filePath);
    yield db.oneOrNone(`UPDATE todos SET imagePath=$1 WHERE id=$2`, [filePath, id]);
    res.status(200).json({ msg: "Operazione andata a buon fine." });
});
