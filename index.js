const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

const students = [
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
app.post('/api/students',(req,res) => {
    let student = {
        id : students.length + 1,
        name: req.body.name
    }
    students.push(student);
    res.status(201).send(student);
});

// put an delete
app.listen(port, ()=> console.log(`Server on ${port}...`));