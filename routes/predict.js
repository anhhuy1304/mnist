var express = require('express');
var PythonShell = require('python-shell');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var img = req.body.imageURL;
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  fs.writeFile('image.png', buf, (error)=>{
    if(error){
      res.send("error when processing image")
      return;
    }
  });
  var a= require('child_process').spawn;
  var pyprog = a('python3', ['/home/anhhuy/Documents/project/detectNumber/cnn/cnn.py']);
  pyprog.stdout.on('data', function(data) {
    res.send(data)
  }) 
  
});



module.exports = router;