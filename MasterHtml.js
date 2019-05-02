
var master = require('./MasterControl');
var fileserver = require('fs');
var ejs = require('ejs');
var fs = require('fs');
var tools = require("./Tools");

class MasterHtml {
	// render partial views
	render(path, data){
		data = data === undefined ? {} : data;
		var params = tools.combineObjandArray(master.view.get(), data);

		var partialViewUrl = "/app/views/" + path;
		var filepartialView = fileserver.readFileSync(master.root + partialViewUrl, 'utf8');

		var partialView =  ejs.render(filepartialView, params);
		return partialView;

	}

	   // render all your link tags styles given the folder location
	renderStyles(folderName, typeArray){

		var styles = [];
		var styleLocation = '/app/assets/stylesheets/';
		var styleFolder = master.root + '/app/assets/stylesheets/';
		var type = typeArray === undefined ? ["css"] : typeArray;

		if(folderName !== undefined && folderName !== ""){
			styleFolder = styleFolder + folderName + "/";
			styleLocation = styleLocation + folderName+ "/";
		 }
		 
		fs.readdirSync(styleFolder).forEach(function(file){

			var fileExtension = file.replace(/^.*\./, '');
			if(type.indexOf(fileExtension) >= 0){
				styles.push('<link rel="stylesheet" type="text/' + type  + '" href="' + styleLocation + file + '">');
			}
	   });

		   var partialView =  ejs.render(styles.join(""));
		return partialView;
	}

	// renders all scripts in main folder or folder location inside of javascript also its type specific if you provide type
	renderScripts(folderName, typeArray){

		var scripts = [];
		var jsFolder = master.root + '/app/assets/javascripts/';
		var jsLocation = '/app/assets/javascripts/';
		var type = typeArray === undefined ? ["js"] : typeArray;

		   if(folderName !== undefined && folderName !== ""){
			   jsFolder = jsFolder + folderName + "/";
			   jsLocation = jsLocation + folderName + "/";
		}

		 fs.readdirSync(jsFolder).forEach(function(file){

			var fileExtension = file.replace(/^.*\./, '');
			if(type.indexOf(fileExtension) >= 0){
				
				scripts.push('<script src="' + jsLocation +  file + '"></script>');
			}
	   });

	   var partialView =  ejs.render(scripts.join(""));
	   return partialView;
	}

	// renders js using location
	renderJS(name, folder){
		if(name === ""){
			return '';
		}
		else{
			var jsLocation = '/app/assets/javascripts/';
			if(folder !== undefined && folder !== ""){
				jsLocation = jsLocation + folder + "/" + name;
			}else{
				jsLocation = jsLocation  + name;
			}
			return '<script type="text/javascript" src="' + jsLocation + '"></script>';
		}
	}

	// render css directly on the page suing location name
	renderCss(name, folder){
		if(name === ""){
			return "";
		}
		else{
			var styleFolder = '/app/assets/stylesheets/';
			if(folder !== undefined && folder !== ""){
				styleFolder = styleFolder + folder + "/" + name;
			}else{
				styleFolder = styleFolder + name;
			}
			return '<link rel="stylesheet" type="text/css" href="' + styleFolder + '">';
		}
	}

	// return link tag
	linkTo(name, location){
		return'<a href=' + location + '>' + name + '</a>';
	}

	   // return image tag
	imgTag(alt, location){
		return '<img src=' + location + ' alt='+ location +'>';
	}

	   // return text are tag
	textAreaTag(name, message, obj){
		
		var textArea = "<textarea name='" + name + "'";
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				textArea = textArea + " " + key + "=" + "'" + obj[key] + "'";
			}
		};

		textArea = textArea + "/>" + message + "</textarea>";

		return textArea;
	}

	   // form element builder starter
	formTag(location, obj){
		var form = "<form action='" + location + "'" ;

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				form = form + " " + key + "=" + "'" + obj[key] + "'";
			}
		};

		return form + ">";
	}

	   // form element builder ender
	formTagEnd(){
		return '</form>';
	}
		   // return text tag
	passwordFieldTag(name, obj){
		var passwordField = "<input type='password' name='" + name + "'";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				passwordField = passwordField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		passwordField = passwordField + '/>';

		return passwordField;
	}
	   
	   // return password field tag
	textFieldTag(name, obj){
		var textField = "<input type='text' name='" + name + "'";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				textField = textField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		textField = textField + '/>';
		return textField;
	   };

	   // hidden field tag
	hiddenFieldTag(name, value, obj){
		
		var hiddenField = "<input type='hidden' name='" + name + "' value='" + value + "'";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				hiddenField = hiddenField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		hiddenField = hiddenField + '/>';
		
		return hiddenField;

	}

	   // subit tag
	submitButton(name, obj){
		
		var submitButton = "<button type='submit' name='" + name + "'";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				submitButton = submitButton + " " + key + "=" + "'" + obj[key] + "'";
			}
		};

		submitButton = submitButton + ">" + name  +'</button>';
		
		return submitButton;

	}

	   // search tag
	searchField(name, obj){
		
		var searchField = "<input type='search' name='" + name + "'";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				searchField = searchField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		searchField = searchField + '/>';
		
		return searchField;
	}

	   // telephone field tag
	telephoneField(name, obj){

		var telephoneField = "<input type='tel' name='" + name + "'";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				telephoneField = telephoneField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		telephoneField = telephoneField + '/>';

		return telephoneField;

	}

	   // date field tag
	dateField(name, obj){

		var dateField = "<input type='date' name='" + name + "'";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				dateField = dateField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		dateField = dateField + '/>';

		return dateField;
	}

	   // date time local field tag
	datetimeLocalField(name, obj){

		var datetimeLocalField = "<input type='datetime-local' name='" + name + "' ";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				datetimeLocalField = datetimeLocalField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		datetimeLocalField = datetimeLocalField + '/>';

		return datetimeLocalField;
	}

	   // date month field tag
	monthField(name, obj){

		var monthField = "<input type='month' name='" + name + "' ";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				monthField = monthField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		monthField = monthField + '/>';

		return monthField;
	}

	   // date week field tag
	weekField(name, obj){

		var weekField = "<input type='week' name='" + name + "' ";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				weekField = weekField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		weekField = weekField + '/>';
		
		return weekField;
	}

	   // date url field tag
	urlField(name, obj){
		
		var urlField = "<input type='url' name='" + name + "' ";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				urlField = urlField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		urlField = urlField + '/>';

		return urlField;
	}


	   // date email field tag
	emailField(name, obj){
		
		var emailField = "<input type='email' name='" + name + "' ";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				emailField = emailField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		emailField = emailField + '/>';

		return emailField;
	}

	   // date color field tag
	colorField(name, color,  obj){
		
		var colorField = "<input type='color' name='" + name + "' value='" + color + "'";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				colorField = colorField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		colorField = colorField + '/>';

		return colorField;
	}

	   // date time field tag
	timeField(name, obj){
		
		var timeField = "<input type='time' name='" + name + "' ";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				timeField = timeField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		timeField = timeField + '/>';

		return timeField;
	}

	   // date number field tag
	numberField(name, min, max, step, obj){
		
		var numberField = "<input type='number' name='" + name + "'" + " min='" +  min + "'" + " max='" + max + "'" + " step='" + step + "'";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				numberField = numberField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		numberField = numberField + '/>';

		return numberField;
	}

	   // date range field tag
	rangeField(name, min, max, obj){

		var rangeField = "<input type='range' name='" + name + "'" + " min='" +  min + "'" + " max='" + max + "'";

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				rangeField = rangeField + " " + key + "=" + "'" + obj[key] + "'";
			}
		};
		rangeField = rangeField + '/>';
		
		return rangeField;
	}

	   // allows you to add data object to params 
	addDataToParams(data){

		//loop through data and add it to new oobjects prototype
		if(data != null){
			var newObj = Object.create(data);
			newObj.prototype = newObj.__proto__;
			master.view.extend(newObj);
		}
	}

	//master.view.helpers.add(name, func);
	// add to helper to current params for view 
	// add(name, func){
	// 	var data = { };
	// 	data.helpers = {};
	// 	data.helpers[name] = func;
	// 	if(name !== "add"){
	// 		this.addDataToParams(data);
	// 		MasterView.helpers[name] = func;
	// 	};
	// }
	
}

master.view.extend(MasterHtml, "html");
