const mongoose=require('mongoose')   


const TodoSchema=new mongoose.Schema({ 
        task:String,
        done:{
                type:Boolean,
                default:0,
        }
 })

 const TodoModel=mongoose.model('todos',TodoSchema)

 module.exports = TodoModel