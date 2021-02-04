const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const notesData = require("../data/notesData");
// const index = require("./index")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));

});

    app.get("/api/notes", (req, res) => {
        res.json(notesData)});
    
   

// require("./apiRoute")(app);
// require("./htmlRoute") (app);





// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));

// app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));



app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT)
});



   
  






















