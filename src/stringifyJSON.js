// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  	// Base case-- arg is a string
	if (typeof obj=== 'string') {
		return '"' + obj + '"';
	}
	
	// no arg passed in
	if(obj === null) {
		return "null";
	}

	// arrays
	if (obj.constructor === Array) {
		// not an empty array
		if (obj.length) {
			var arrayJSON = [];
			
			for (var i = 0; i < obj.length; i++) {
				// call stringifyJSON on each element in array and add to new empty array;
				// recursion
				arrayJSON.push(stringifyJSON(obj[i]));
			}
			// join array of strings with a comma and add array brackets around it
			return '[' + arrayJSON.join(",") + ']';

		// empty array
		} else {
			return '[]';
		}
	}

	// objects
	if (obj.constructor === Object) {
		// properties
		var objKeys = Object.keys(obj);

		// if object has properties -- is not an empty object
		if (objKeys.length) {
			var objJSON = '';

			// iterate through each property
			for (var j = 0; j < objKeys.length; j++) {
				// object property = key;
				var key = objKeys[j];

				// property doesn't exist, value is undefined, or the key/value are functions-- return null;
				if (!key || obj[key] === undefined || typeof key === 'function' || typeof obj[key] === 'function') {
					return '{}';
				} else {
					// last property in object---> without comma ',' at the end.
					if (j === objKeys.length - 1) {
						// recursion
						objJSON += stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
					
					// all other properties---> key-value have commas after the entry
					} else {
						// recursion
						objJSON += stringifyJSON(key) + ':' + stringifyJSON(obj[key]) + ',';
					}
				}
			}
			// put key-value pairs in object {} braces.
			return '{' + objJSON + '}';

		// empty object
		} else {
			return '{}';
		}
	}
	return '' + obj;
};
