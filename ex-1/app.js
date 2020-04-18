const http = require('http');
const fs = require('fs');

var filePath = './public/views/viewTextInBrowser.txt';
  
http.createServer(function (req, res) {
    fs.readFile(filePath, function(err, data){
        // console.log(err, data);
        if(!err){
            // res.writeHead(200);
            res.write(data, 'utf-8');
            res.end();
        }
    });
  }).listen(8088, '0.0.0.0');