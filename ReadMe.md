# fileDB documentation.

## Author
Ajah, Chukwuemeka

## Contacts
chukwuemekaajah on npmJS
chukwuemekaajah on github

## Install

    $ npm install fileDB

## Usage

This is a library that implements a file system database that is entirely built with Javascript and stores data in designated
files as JSON format data. It can be used for prototyping when building web apps with nodeJS on a remote server.

#### Motivation for the Library
This library was built by a beginner JavaScript developer so as to learn how to use databases to interact with my nodeJS web app
and as well contribute my own quota to the open source community and as well help beginner JavaScript developers learn how to use databases thereby 
preparing them for learning NoSql databases like MongoDB.

## Documentation

## To create an instance of the database:
	var db = require('fileDB');
	db = new db();

## To create a connection to the database:
	db.createConnection('filename',callback);
     This creates a new file database in JSON format if it does not exist or instantiates the database if it is already a well-formatted JSON file.
     The optional callback can be used to perform any action as the creation of the database returns true if the database was created.

## To save a document to the database.
	db.save('collection','document',callback);
     This saves a document which is in JavaScript object format and saves it in the specified collection array. It returns true if the document is 
     successfully  saved and the return value which is a boolean can be utilized by the callback to carryout any specified action.	
	example: db.save('books',{name:'Things fall apart',author:'Chinua Achebe'},function(val){if(val) console.log('document successfully saved'); else console.log('something went wrong');});

## To update a document in the database.
	db.update('collection','newDocumentValues',callback);
     This updates all the documents in the given collection with the new values specified in the newDocumentvalues argument and returns a boolean to the callback.
	example: db.update('books',{name:'AntHills of the Savannah',author:'Chinua Achebe'},function(bool){ if(bool) console.log('update done') else console.log('unsuccessful');});

## To find documents in a database.
	db.find('collection','conditions',callback);
     This finds all the documents in the given collection of the database that satisfies the given the conditions and the conditions argument is an array of 
     desired properties to be satisfied by the documents. It returns an array of documents that satisfy the given conditions.
	example: db.find('collection',['name','author'],function(results){ if(results) console.log(results); else console.log('there are no documents that satisfy the conditions');});

## To remove documents from a database.
	db.remove('collection','conditions',callback);
     This finds all the documents in the collection of the database that satisfies the given conditions and the conditions argument is an array of specifications
     and then removes all the documents that satisfy the given condition. It returns true if the process is successful.
	example: db.remove('books',['name','author'],function(bool) { if(bool) console.log('successful'); else console.log('unsuccessful');});

## To aggregate the number of documents in a collection.
	db.aggregate('collection','conditions',callback);
     This aggregates the number of documents in the given collection and returns the value to the callback to utilize in any activity. It checks to see if the collection
     exists first before returning the number of documents.
	example: db.aggregate('books',['name','author'],function(value){ console.log(value);});

## All of the functions except save and aggregate have another form of it whereby only one value is acted upon. Other functions are:
	db.findOne('collection','conditions',callback);
	db.updateOne('collection','conditions',callback);
	db.removeOne('collection','conditions',callback);

'# fileDB' 
