var obj = {"a":{"b":{"c":1}}};
function getProperty(){
    var value = 0;
    try{
        var arr = Array.prototype.slice.call(arguments);
        value = arr.shift();
        
        arr.forEach(key => {
            value = value[key];
        });
    }catch(e){
        value = 0;
    }
    return value;
}
getProperty(obj, 'a', 'b');