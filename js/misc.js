/* 
    --------------------------------------------------------
                   Miscellaneous javascript function
    --------------------------------------------------------     
*/
var misc = {

	//--------------------------------------------------------//
	//					Generate random number                     
	//--------------------------------------------------------//
	randomNumber: function (maxNum) {

		var randomNum = Math.floor(Math.random() * maxNum);
		return randomNum;

	},

	//--------------------------------------------------------//
	// 					Generate random id                     
	//--------------------------------------------------------//
	randomID: function (prefix, maxNum) {

		var randomId = prefix + Math.floor(Math.random() * maxNum);
		return randomId;

	},

	//--------------------------------------------------------//
	// 					Alert for refresh page                     
	//--------------------------------------------------------//
	refreshPage: function () {

		window.addEventListener("beforeunload", function (e) {
			var confirmationMessage = "\o/";

			(e || window.event).returnValue = confirmationMessage; //Gecko + IE
			return confirmationMessage;                            //Webkit, Safari, Chrome
		});

	},

	//--------------------------------------------------------//
	// 						Add css rule                    
	//--------------------------------------------------------//
	addCSSRule: function (sheet, selector, rules, index) {

		if ("insertRule" in sheet) {
			sheet.insertRule(selector + "{" + rules + "}", index);
		}
		else if ("addRule" in sheet) {
			sheet.addRule(selector, rules, index);
		}

	},

	//--------------------------------------------------------//
	// 					Hex to rgb converter                     
	//--------------------------------------------------------//
	hexToRgb: function (hex) {

		var bigint = parseInt(hex, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;

		return r + "," + g + "," + b;

	},

	//--------------------------------------------------------//
	// 					Hex to rgba converter                     
	//--------------------------------------------------------//
	hexToRgba: function (hex, opacity) {

		var bigint = parseInt(hex, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;

		return r + "," + g + "," + b + opacity;

	},

	//--------------------------------------------------------//
	// 					Hex to rgba converter                     
	//--------------------------------------------------------//
	hexToRGB: function (hex, alpha) {

		var r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

		if (alpha) {
			return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
		} else {
			return "rgb(" + r + ", " + g + ", " + b + ")";
		}

	},

	//--------------------------------------------------------//
	// 					check spacial char                     
	//--------------------------------------------------------//
	checkChar: function (str) {

		return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);

	},
	
	//--------------------------------------------------------//
	// 					Delay function                     
	//--------------------------------------------------------//
	delay: function (ms) {

		var start = new Date().getTime();
		var end = start;
		while (end < start + ms) {
			end = new Date().getTime();
		}

	},
	
	//--------------------------------------------------------//
	// 				Check script if already loaded                     
	//--------------------------------------------------------//
	isScriptAlreadyIncluded: function (src) {
		var scripts = document.getElementsByTagName("script");
		for (var i = 0; i < scripts.length; i++) {
			console.log(scripts[i]);
			if (scripts[i].getAttribute('src') == src) return true;

		}

		return false;
	}

}

/* 
    --------------------------------------------------------
                Create dom elements dynamically
    --------------------------------------------------------     
*/
var Element = function () {

	this.object = null;
	// this.parent = null;

	this.create = function (htmlElement, id, className, parent) {
		this.object = document.createElement(htmlElement);
		this.object.setAttribute('id', id);
		this.object.setAttribute('class', className);
		parent.appendChild(this.object);
		// this.parent = parent;
		return this.object;
	}

	this.delete = function (elem) {
		//this.object.parentNode.removeChild(elem);
		this.object.removeChild(elem);
	}

	this.addEvent = function (eventName, callback) {
		this.object.addEventListener(eventName, callback);
	}

	this.removeEvent = function (eventName, callback) {
		this.object.removeEventListener(eventName, callback);
	}

	this.addClass = function (className) {
		this.object.classList.add(className);
	}

	this.removeClass = function (className) {
		this.object.classList.remove(className);
	}

	this.toggle = function (className) {
		this.object.classList.toggle(className);
	}

	this.insertHTML = function (html) {
		this.object.innerHTML = html;
	}

	this.getId = function () {
		return this.object.id;
	}

	this.getClassList = function () {
		return this.object.classList;
	}

	this.setLabel = function (label) {
		this.object.appendChild(document.createTextNode(label));
	}

	// this.getLabel = function(label){
	//     return this.object.childNodes[0].text;        
	// }

	this.msg = function (text) {
		console.log(text);
	}

	return this;
}   