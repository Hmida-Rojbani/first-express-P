const express = require('express');

const app = express();

app.get('',function (req,res) {
    res.send('<H1> Bonsoir GLSI-P </H1>')
});

app.listen(3000, ()=> console.log('Server on 3000...'));