const express = require("express");

const todo = require("./models/todos");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// READ
app.get("/todo", todo.read);

// CREATE
app.post("/todo", todo.create);

// UPDATE
app.put("/todo/:id", todo.update);

// DELETE
app.delete("/todo/:id", todo.delete);

app.listen(port, () => {
	console.log("listening on port " + port);
});
