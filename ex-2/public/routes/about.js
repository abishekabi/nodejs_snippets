module.exports = function(req, res){
    res.sendFile('about.html', {
        root: __dirname + '/../views'});
    };
  