const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/todos')

const mongoURl=process.env.MONGODB_URL
mongoose.connect(mongoURl)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express()
app.use(cors())
app.use(express.json())

app.post('https://todo-list-two-tau-46.vercel.app/add', (req, res) => {
    const todo = req.body.todo
    TodoModel.create({
        todo: todo
    })
        .then(result => res.json(result))
        .catch(err => res.json(err))

})
app.get('https://todo-list-two-tau-46.vercel.app/get', async (req, res) => {
    await TodoModel.find()
        .then(result => res.json(result))
        .catch(err => console.log(err))
})
app.put('https://todo-list-two-tau-46.vercel.app/update/:id', async (req, res) => {
    

     const { id } = req.params;
     await TodoModel.findByIdAndUpdate({ _id: id },{done:true})
     .then(result => res.json(result))
     .catch(err => console.log(err))


})


app.delete('https://todo-list-two-tau-46.vercel.app/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})
app.listen(process.env.PORT, () => {
    console.log('server is running port 3000')
})