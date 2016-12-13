var fs = require('fs');
var path = require('path');


function db () {
	this.file = '';
this.createConnection = function(f,fn){
	this.file = path.resolve('',f);
	console.log(this.file);
	var d = fs.existsSync(this.file);
	if(!d)
		/* THIS CREATES A TEST COLLECTION FOR PROTOTYPING PURPOSES*/
		fs.writeFileSync(this.file,JSON.stringify({test:[]}))
		return fn(true);
}

this.aggregate = function(col,cond,fn){
	var x = this.find(col,cond);
	return fn(x.length);
}
	

this.save = function(col,doc,fn){
	var f = fs.readFileSync(this.file);
	var fst = JSON.parse(f.toString());
	
	if(fst.hasOwnProperty(col)){
		fst[col].push(doc);
		var d = JSON.stringify(fst);
		fs.writeFileSync(this.file,d);
		return fn(true);
	}
	else{
		
		fst[col] =[];
		
		fst[col].push(doc);
		var d = JSON.stringify(fst);
		fs.writeFileSync(this.file,d);
		return fn(true);
	}
}


this.update = function(col,doc,fn){
	var f = fs.readFileSync(this.file);
	var fst = JSON.parse(f.toString());
	var collector = [];
	if(fst.hasOwnProperty(col)){
		
			for(var i = 0; i < fst[col].length; i++){
				var truthy = true;
				for(var u in doc){
					if(fst[col][i].hasOwnProperty(u)){
						continue;	
					}
					else {
						truthy = false;
						break;
					}
			}
			if(truthy){
				for(var y in doc){
					fst[col][i][y] = doc[y];
				}
			}
		}
	}

	else{
		return fn(false);
	}
	
	fs.writeFileSync(this.file,JSON.stringify(fst))
	return fn(true);
}

this.remove = function(col,doc,fn){
	var f = fs.readFileSync(this.file);
	var fst = JSON.parse(f.toString());
	var collector = [];
	if(fst.hasOwnProperty(col)){
		
			for(var i = 0; i < fst[col].length; i++){
				var truthy = true;
				for(var u in doc){
					if(fst[col][i].hasOwnProperty(u) && fst[col][i][u] === doc[u]){
						continue;	
					}
					else {
						truthy = false;
						break;
					}
			}
			if(truthy){
				
				delete fst[col][i];
			}
		}
	}

	else {
		return fn(false);
	}
	var co = [];

	for(var o = 0; o < fst[col].length;o++){
		if(typeof(fst[col][o]) === 'object')
				co.push(fst[col][o])
			
	}
	
	fst[col] = co;

	fs.writeFileSync(this.file,JSON.stringify(fst));
	return fn(true);
}

this.find = function(col,doc,fn){
	var f = fs.readFileSync(this.file);
	var fst = JSON.parse(f.toString());
	var collector = [];
	if(fst.hasOwnProperty(col)){
		
			for(var i = 0; i < fst[col].length; i++){
				var truthy = true;
				for(var u in doc){
					if(!fst[col][i].hasOwnProperty(doc[u])){
						truthy = false;
						break;	
					}
			}
			if(truthy){
				
			collector.push(fst[col][i]);
			}
		}
	}

	else {
		return fn(false);
	}
	

	return fn(collector);
}

this.removeOne = function(col,doc,fn){
	var f = fs.readFileSync(this.file);
	var fst = JSON.parse(f.toString());
	var collector = [];
	if(fst.hasOwnProperty(col)){
		
			for(var i = 0; i < fst[col].length; i++){
				var truthy = true;
				for(var u in doc){
					if(!(fst[col][i].hasOwnProperty(u) && fst[col][i][u] === doc[u])){
						truthy = false;
						break;
					}
			}
			if(truthy){
				
				delete fst[col][i];
				break;
			}
		}
	}

	else {
		return fn(false);
	}
	var co = [];

	for(var o = 0; o < fst[col].length;o++){
		if(typeof(fst[col][o]) === 'object')
				co.push(fst[col][o])
			
	}
	fst[col] = co;
	fs.writeFileSync(this.file,JSON.stringify(fst));
	return fn(true);
}

// returns one instance of a document that matches the criterion/criteria.
this.findOne = function(col,doc,fn){
	var f = fs.readFileSync(this.file);
	var fst = JSON.parse(f.toString());
	var collector = [];
	if(fst.hasOwnProperty(col)){
			for(var i = 0; i < fst[col].length; i++){
				var truthy = true;
				for(var u in doc){
					if(!fst[col][i].hasOwnProperty(doc[u])){
						truthy = false;
						break;	
					}
			}
			if(truthy){
				
			collector.push(fst[col][i]);
			return fn(collector);
			}
		}
	}

	else {
		return fn(false);
	}
}
}
module.exports = db;