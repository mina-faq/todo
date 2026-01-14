const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let todos = [];

function renderPage() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Cloud PaaS ToDo App</title>
</head>
<body>
  <h1>ToDo-Liste (Node.js PaaS)</h1>

  <form method="POST" action="/add">
    <input type="text" name="todo" placeholder="Neue Aufgabe" required>
    <button type="submit">Hinzufügen</button>
  </form>

  <ul>
    ${todos.map(todo => `<li>${todo}</li>`).join("")}
  </ul>
</body>
</html>
`;
}

app.get("/", (req, res) => {
  res.send(renderPage());
});

app.post("/add", (req, res) => {
  const todo = req.body.todo;
  if (todo) {
    todos.push(todo);
  }
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
