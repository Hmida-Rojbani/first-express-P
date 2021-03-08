const express = require('express');
const Joi = require('joi')
const port = process.env.PORT || 3001;
const app = express();

var students = [
    {id : 1, name : 'Student1'},
    {id : 2, name : 'Student2'},
    {id : 3, name : 'Student3'}
]

app.get(['','/index'],function (req,res) {
    res.send('<H1> Bonsoir GLSI-P </H1>')
});

app.get('/api/students',function (req,res) {
    res.send(students)
});

app.get('/api/students/:id',function (req,res) {
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student)
        return res.status(404).send('Student with this id is not found');
    res.send(student)
});
app.use(express.json());

const student_validation_schema = Joi.object({
    name : Joi.string().min(4).max(20).required()
})

app.post('/api/students',(req,res) => {
    //if(!req.body.name || req.body.name.length < 4)
    //    return res.status(400).send("Student name must exists with at least 4 charcters");
    let result = student_validation_schema.validate(req.body);
    if(result.error)
        res.status(400).send(result.error.details[0].message)
    let student = {
        id : students.length + 1,
        name: req.body.name
    }
    students.push(student);
    res.status(201).send(student);
});


// put 

app.put('/api/students/:id',function (req,res) {
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student)
        return res.status(404).send('Student with this id is not found');
    student.name = req.body.name;
    res.send(student)
});

// delete

app.delete('/api/students/:id',function (req,res) {
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student)
        return res.status(404).send('Student with this id is not found');
    students = students.filter(s => s.id !== parseInt(req.params.id));;
    res.send(student)
});

app.listen(port, ()=> console.log(`Server on ${port}...`));