const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const TodoModel=require('./Models/Todo')

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get',(req,res)=>{
    TodoModel.find().sort({done:1})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.updateOne(
        { task: task },
        { $setOnInsert: { task: task } }, 
        { upsert: true }
    )
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


//marking
app.put('/update/:id',(req,res)=>{
    const {id}=req.params
    TodoModel.findByIdAndUpdate({_id:id},{done:1})
    .then(result=> res.json(result))
    .catch(err=>res.json(err))
})



app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=> res.json(result))
    .catch(err=>res.json(err))
})

app.listen(1012,()=>console.log('Server is running'))