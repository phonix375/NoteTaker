const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const notes = require('./db/db.json')

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/',(req, res) => {
    console.log(notes);
    res.send(node)
    //res.sendFile(path.join(__dirname,'./public/index.html'));
});
app.get('/notes',(req, res) => {
    console.log(notes);
    res.sendFile(path.join(__dirname,'./public/notes.html'));
});

app.get('/api/notes',(req, res) => {
    res.json(notes);
});
app.post('/api/notes',(req, res) => {
    req.body.id = Date.now().toString();
    notes.push(req.body);
    fs.writeFileSync(path.join(__dirname,'./db/db.json'),JSON.stringify(notes))
    res.json(req.body);
});

app.delete('/api/notes/:id', (req, res)=>{
    const id = req.params.id;
    for(let i = 0; i < notes.length;i++){
        if(notes[i].id === id){
            notes.splice(i,1);
        }
    }
    fs.writeFileSync(path.join(__dirname,'./db/db.json'),JSON.stringify(notes));
    res.JSON(notes);
})

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`)
})
