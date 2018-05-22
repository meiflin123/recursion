// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj){
  var type = typeof obj;
  if(/undefined|function/.test(type)){return undefined}

  if(/string/.test(type)){ return '"' + obj + '"'}
  if(/number|boolean|string/.test(type) || obj === null){
    return '' + obj;
  }
  else if(type ==='object'){
    if(Array.isArray(obj)){
      var newArr = [];
      obj.forEach(function(x){
      	if(/undefined|function/.test(typeof x)){
      		newArr.push('null')
      	}
      	else newArr.push(stringifyJSON(x))})
     return '[' + newArr.join() +']'
     } else {
       var newObj = []
       for (var x in obj){
       	if (!/undefined|function/.test(typeof obj[x])) {
         newObj.push(stringifyJSON(x) + ':' + stringifyJSON(obj[x]))
       	}
    } return '{' + newObj.join() + '}'
    }
  }

}