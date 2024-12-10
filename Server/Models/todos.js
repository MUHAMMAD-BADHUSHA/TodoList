const mongoose=require('mongoose')

const todoSchema= new mongoose.Schema({

    todo:String,
    done:{
        type:Boolean,
        default:false
    }
})
const TodoModel= mongoose.model("todos",todoSchema)
module.exports=TodoModel