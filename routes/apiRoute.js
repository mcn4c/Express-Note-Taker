const notesData = require("../data/notesData");


module.export = (app) => {

    app.get("/api/notes", (req, res) => {
        res.json(notesData);
    } )
}