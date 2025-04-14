const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/todos");

const mongoURl = process.env.MONGODB_URL;
mongoose.connect(mongoURl)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
const allowedOrigins = [
  "https://todo-list-two-tau-46.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("todo server");
});

app.post("/add", async (req, res) => {
  try {
    const todo = req.body.todo;
    const newTodo = await TodoModel.create({
      todo: todo,
    });
    console.log(newTodo);
    
    res.status(200).json({ success: true, message: "todo added ", data: newTodo });
  } catch (err) {
    console.error("Error adding todo:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.get("/get", async (req, res) => {
     try{
     const todos = await TodoModel.find()
     console.log(todos)
     res.status(200).json({success:true, data:todos})
     }catch(err){
      console.log(err.message)
      res.status(500).json({success:false, message:'server error'})
     }
     
    
});
app.put("/update/:id", async (req, res) => {
  try{
   const { id } = req.params;
   const updatedTodo =  await TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
   res.status(200).json({success:true, data:updatedTodo})
   
  }catch(err){
    console.error(err.message)
    res.status(500).json({success:false, message:'server error',})
  }
});

app.delete("/delete/:id",async (req, res) => {
  try {
     const { id } = req.params;
     const deleteTodo = await TodoModel.findByIdAndDelete({ _id: id })
     res.status(200).json({success:true, message:'todo deleted',data:deleteTodo})
  }catch(err){
    console.error(err,message)
    res.status(500).json({success:false, message:'server error',}) 
  }
 
  
   
});
app.listen(process.env.PORT, () => {
  console.log("server is running port 3000");
});
