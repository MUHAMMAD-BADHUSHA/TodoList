const mongoose=require('mongoose')

const todoSchema= new mongoose.Schema({

    todo: {
        type: String,
        required: true,
      },
    done:{
        type:Boolean,
        default:false
    }
})
const TodoModel= mongoose.model("todos",todoSchema)
module.exports=TodoModel