const path = require("path");

module.exports = function(app) {

  app.get("./notes.html", function(req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
  });
  
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
  });
  
};
