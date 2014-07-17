/*global module:true*/
/*global __dirname:true*/
/*global require:true*/
(function(){
	"use strict";

	var path = require( 'path' );
	var fs = require( 'fs' );

	var Colorfy = require( path.join( __dirname, 'colorfy' ) );

	var DirectoryColorfy = function( input, output, opts ){
		var files;
		if( typeof input === "string" && fs.lstatSync( input ).isDirectory()){
			files = fs.readdirSync( input ).map( function( file ){
				return path.join( input, file );
			});
		} else if( Array.isArray( input ) ){
			files = input;
		} else {
			throw new Error( "Input must be Array of files or String that is a directory" );
		}

		this.files = files.filter(function( file ){
			if( path.extname( file ) === ".svg" ){
				return file;
			}
		});
		this.input = input;
		this.output = output;
		this.options = opts || {};
		this.colors = this.options.colors || {};
	};

	DirectoryColorfy.prototype.convert = function(){
		var self = this;
		var filesWritten = [];
		this.files.forEach(function(file){
			var c = new Colorfy( file, self.colors, self.options.dynamicColorOnly );
			c.convert();
			filesWritten.push.apply( filesWritten, c.writeFiles( self.output ) );
		});

		return filesWritten;
	};


	module.exports = DirectoryColorfy;

}(typeof exports === 'object' && exports || this));

