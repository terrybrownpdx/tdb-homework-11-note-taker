const db = require("./db.json");
const fs = require("fs");
const uuid = require("uuid");

module.exports = function(app) {
  app.get("./notes.html", function(req, res) {
    res.send(db);
  });

  app.post("./notes.html", function(req, res) {

    let noteId = uuid();
    let newNote = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    };

    fs.readFile("./db.json", "utf8", (err, data) => {
      if (err) throw err;

      const allNotes = JSON.parse(data);

      allNotes.push(newNote);

      fs.writeFile("./db.json", JSON.stringify(allNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Note created!")
      });
    });
  });

  app.delete("./notes.html/:id", (req, res) => {

    let noteId = req.params.id;

    fs.readFile("./db.json", "utf8", (err, data) => {
      if (err) throw err;

      const allNotes = JSON.parse(data);
      const newAllNotes = allNotes.filter(note => note.id != noteId);

      fs.writeFile("./db.json", JSON.stringify(newAllNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Note deleted!")
      });
    });
  });
};