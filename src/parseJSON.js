// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	
  var index = 0;
  var character = ' ';
  var whitespace = function(){
		while(character && /\s/.test(character)){
			next()
		}
	}

	var next = function(ch){
		if(ch && ch!== character){
		  throw new SyntaxError("Expected '" + ch + "' instead of '" + character + "'");
		}
		character = json.charAt(index);
        index++;
        return character;
	}

 var value = function() {
    whitespace()
		if(character === '"'){ return string();}
	   	else if(/-|[0-9]/.test(character)) {return number()}
	    else if(character === '['){ return array()}
	    else if (character === '{'){ return object()}
	    else {return special()} 
	}
 

  var string = function(){
    var str = "";
    var exception = {
      '"'  : '"',
      '\\' : '\\',
      '/'  : '/',
      b    : '\b',
      f    : '\f',
      n    : '\n',
      r    : '\r',
      t    : '\t'
    };

    if(character === '"'){
      while(next()){
        if(character === '"'){
          next('"');
          return str;
        } else if(character === '\\'){
          next();
          if(typeof exception[character] === 'string'){
            str += exception[character];
          } else {
            break;
          }
        } else {
          str += character;
        }
      }
    }
    throw new SyntaxError('Bad string');
  };

  
  var number = function(){
    var str = "";
    while(/-|[0-9]/.test(character)){
      str += character;
      next();
    }

    if(character === '.'){
      str += character;
      while(next() && /[0-9]/.test(character)){
        str += character;
      }
    }

    var number = Number(str);

    if (isNaN(number)) {
      throw new SyntaxError("Bad number");
    } else {
      return number;
    }
  };

  var array = function() {
    var arr = [];
    if ((character === '[')){
      next();
      whitespace();
      if(character === ']'){
        next();
        return arr;
      }
      while(character){
        arr.push(value());
        whitespace();
        if(character === ']'){
          next();
          return arr;
        }
        next();
        whitespace();
      }
    }
    throw new SyntaxError('Bad array');
  };

 
  var object = function(){
    var obj = {};

    if(character === '{'){
      next();
      whitespace();
      if(character === '}'){
        next();
        return obj;
      }
      while(character){
        var key = string();
        whitespace();
        next(':');
        var val = value();
        obj[key] = val;
        whitespace();
        if(character === '}'){
          next();
          return obj;
        }
        next(',');
        whitespace();
      }
    }
    throw new SyntaxError('Bad object');
  };

  var special = () => {
    if(character === 't'){
      next('t');
      next('r');
      next('u');
      next('e');
      return true;
    }

    if(character === 'f'){
      next('f');
      next('a');
      next('l');
      next('s');
      next('e');
      return false;
    }

    if(character === 'n'){
      next('n');
      next('u');
      next('l');
      next('l');
      return null;
    }
  };

  return value();
};