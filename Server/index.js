const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/todos");

const mongoURl = process.env.MONGODB_URL;
mongoose
  .connect(mongoURl)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
app.use(
    cors({
      origin: "https://todo-list-two-tau-46.vercel.app",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('todo server')
})

app.post("/add", (req, res) => {
  const todo = req.body.todo;
  TodoModel.create({
    todo: todo,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.get("/get", async (req, res) => {
  await TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  await TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
app.listen(process.env.PORT, () => {
  console.log("server is running port 3000");
});
