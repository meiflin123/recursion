// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
	var elements = []
	function getElementsWithClassName (element){
		if(element.classList && element.classList.contains(className)){
			elements.push(element)
		}
        if(element.childNodes){

        	var array = [... element.childNodes]
        	array.forEach(function(children){
        		getElementsWithClassName(children)
        	})
        } 
    }
        getElementsWithClassName(document.body)
        return elements
	
}