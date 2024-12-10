const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/todos')

mongoose.connect('mongodb://localhost:27017/TodoList', console.log('database connected'))

const app = express()
app.use(cors())
app.use(express.json())

app.post('/add', (req, res) => {
    const todo = req.body.todo
    TodoModel.create({
        todo: todo
    })
        .then(result => res.json(result))
        .catch(err => res.json(err))

})
app.get('/get', async (req, res) => {
    await TodoModel.find()
        .then(result => res.json(result))
        .catch(err => console.log(err))
})
app.put('/update/:id', async (req, res) => {
    

     const { id } = req.params;
     await TodoModel.findByIdAndUpdate({ _id: id },{done:true})
     .then(result => res.json(result))
     .catch(err => console.log(err))


})


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})
app.listen(3000, () => {
    console.log('server is running port 3000')
})