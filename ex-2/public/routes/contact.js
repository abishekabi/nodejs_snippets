module.exports = function(req, res){
    res.sendFile('contact.html', {
        root: __dirname + '/../views'});
    };
  