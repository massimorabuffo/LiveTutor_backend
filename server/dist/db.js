var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pgPromise from "pg-promise";
export const db = pgPromise()({
    host: "127.0.0.1",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "postgress"
});
export const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
        DROP TABLE IF EXISTS todos;
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL NOT NULL PRIMARY KEY,
        title TEXT NOT NULL ,
        completed TEXT,
        imagePath TEXT
        );
    `);
    try {
        const response = yield db.none(`
        INSERT INTO todos (title) VALUES ('compare pane');`);
    }
    catch (error) {
        console.log(error);
    }
});
