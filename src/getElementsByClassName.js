// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node
) {
  var elementsofClass = [];
  var node = node || document.body;
  
  // body/parent
  if (node.classList) {
  	if (node.classList.contains(className)) {
  		elementsofClass.push(node);
  	}
  }

  // children elements classes.
  for (var i = 0; i < node.children.length; i++) {
  	var childNodes = getElementsByClassName(className, node.children[i]);
  	elementsofClass = elementsofClass.concat(childNodes);
  }

  return elementsofClass;

};
