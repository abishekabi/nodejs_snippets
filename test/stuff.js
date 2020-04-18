
var mod1 = function(){
    return "Calling module 1";

}

var mod2 = function(){
    return "Calling  module 2";
    
}

module.exports = {
    mod1: mod1(),
    mod2: mod2(),
}